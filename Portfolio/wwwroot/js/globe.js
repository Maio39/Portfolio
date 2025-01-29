// Import corretti
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";

export function initializeGlobe(canvasId) {
    let camera, scene, renderer, controls, globe, clock;

    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4.5, 2, 3);

    scene = new THREE.Scene();

    // ☀️ Sole più luminoso
    const sun = new THREE.DirectionalLight(0xffffff, 3.5);
    sun.position.set(0, 0, 3);
    scene.add(sun);

    // 🌌 Luce ambientale più forte
    const ambientLight = new THREE.AmbientLight(0x404040, 2.0);
    scene.add(ambientLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load('images/earth_texture_8k.jpg');
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    dayTexture.anisotropy = 8;

    const nightTexture = textureLoader.load('images/8k_earth_nightmap.jpg');
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.anisotropy = 8;

    // 📌 Shader migliorato per maggiore luminosità
    const fragmentShader = `
        uniform sampler2D dayMap;
        uniform sampler2D nightMap;
        uniform vec3 lightDirection;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            float intensity = dot(normalize(vNormal), normalize(lightDirection));

            // 📌 Transizione più morbida con gamma più ampia
            intensity = smoothstep(-0.4, 0.3, intensity);

            vec4 dayColor = texture2D(dayMap, vUv) * 1.3; // ☀️ Schiarisce il giorno
            vec4 nightColor = texture2D(nightMap, vUv) * 1.5; // 🌙 Schiarisce la notte

            // 🌆 Fonde giorno e notte con una transizione più graduale
            gl_FragColor = mix(nightColor, dayColor, intensity);
        }
    `;


    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vUv = uv;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const globeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            dayMap: { value: dayTexture },
            nightMap: { value: nightTexture },
            lightDirection: { value: sun.position.clone().normalize() }
        },
        vertexShader,
        fragmentShader
    });

    // 🌍 Creazione Globo
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    scene.add(globe);

    // ☁️ Atmosfera (dopo il globo)
    const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        varying vec3 vNormal;
        void main() {
            float intensity = pow(0.5 - dot(vNormal, vec3(0,0,1)), 4.0);
            gl_FragColor = vec4(0.2, 0.6, 1.0, intensity * 0.8);
        }
    `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });

    // 🌌 Creazione dell'atmosfera (leggermente più grande del globo)
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), atmosphereMaterial);
    scene.add(atmosphere);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById(canvasId) });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Assicura che il canvas si ridimensioni con la finestra
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Controls (OrbitControls per navigazione)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 50;

    // Window resize event
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 🎛 Debug GUI
    const gui = new GUI();
    gui.add(sun, 'intensity', 0, 5, 0.1).name('Sun Intensity');
    gui.add(ambientLight, 'intensity', 0, 3, 0.1).name('Ambient Light');

    // Animation loop
    function animate() {
        const delta = clock.getDelta();
        globe.rotation.y += delta * 0.025;
        controls.update();
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}

window.initializeGlobe = initializeGlobe;
