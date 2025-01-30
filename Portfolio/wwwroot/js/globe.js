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

    const bumpRoughnessCloudsTexture = textureLoader.load('images/earth_bump_roughness_clouds_4096.jpg');
    bumpRoughnessCloudsTexture.anisotropy = 8;
    bumpRoughnessCloudsTexture.colorSpace = THREE.SRGBColorSpace;


    // 📌 Shader migliorato per maggiore luminosità
    const fragmentShader = `
        uniform sampler2D dayMap;
        uniform sampler2D nightMap;
        uniform sampler2D bumpRoughnessCloudsMap;
        uniform vec3 lightDirection;

        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            float intensity = dot(normalize(vNormal), normalize(lightDirection));
            intensity = smoothstep(-0.2, 0.2, intensity);
        
            vec4 dayColor = texture2D(dayMap, vUv) * 1.3;
            vec4 nightColor = texture2D(nightMap, vUv) * 1.7;
        
            // 🌥️ Effetto Nuvole con Bump
            vec4 bumpClouds = texture2D(bumpRoughnessCloudsMap, vUv);
            float cloudsStrength = smoothstep(0.2, 1.0, bumpClouds.b); 
        
            // 🌍 Mix Giorno, Notte e Nuvole
            vec3 finalColor = mix(nightColor.rgb, dayColor.rgb, intensity);
            finalColor = mix(finalColor, vec3(1.0), cloudsStrength * 0.6); // Rende le nuvole più bianche

            gl_FragColor = vec4(finalColor, 1.0);
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
            bumpRoughnessCloudsMap: { value: bumpRoughnessCloudsTexture }, // 🌥️ Nuvole con Bump
            lightDirection: { value: sun.position.clone().normalize() }
        },
        vertexShader,
        fragmentShader,
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
    controls.dampingFactor = 0.05;  // Rende la rotazione più fluida
    controls.enablePan = false;  // ❌ Blocca lo spostamento laterale
    controls.minDistance = 1.1;  // Impedisce di avvicinarsi troppo
    controls.maxDistance = 10;  // Impedisce di allontanarsi troppo
    controls.target.set(0, 0, 0);  // 🔄 Mantiene la rotazione attorno al centro del globo
    controls.minPolarAngle = Math.PI / 4;  // Evita di guardare troppo in basso
    controls.maxPolarAngle = Math.PI - Math.PI / 4;  // Evita di guardare troppo in alto
    controls.update();


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
    // 🌍 Oggetto per i parametri di rotazione
    const globeRotation = {
        longitude: -65, // Valore iniziale per centrare l'Italia
        latitude: -5
    };

    // ✏️ Funzione per aggiornare la rotazione
    function updateGlobeRotation() {
        globe.rotation.y = globeRotation.longitude * (Math.PI / 180); // Longitudine
        globe.rotation.x = globeRotation.latitude * (Math.PI / 180); // Latitudine
    }

    // 🎛 Aggiungi un folder per la rotazione del globo
    const globeFolder = gui.addFolder("Globe Rotation");
    globeFolder.add(globeRotation, "longitude", -180, 180, 0.1).name("Longitude").onChange(updateGlobeRotation);
    globeFolder.add(globeRotation, "latitude", -90, 90, 0.1).name("Latitude").onChange(updateGlobeRotation);
    globeFolder.open(); // Apri il folder per default

    // 🔄 Imposta la rotazione iniziale
    updateGlobeRotation();

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
