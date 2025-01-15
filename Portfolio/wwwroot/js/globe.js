import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

export function initializeGlobe(canvasId) {
    const canvas = document.getElementById(canvasId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Carica la texture del mappamondo
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('images/earth_texture_8k.jpg');

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Aggiungi luci
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Configura OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Abilita l'inerzia
    controls.dampingFactor = 0.25;
    controls.enableZoom = true; // Abilita lo zoom

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Aggiorna i controlli
        //globe.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    // Aggiungi un listener per ridimensionare il renderer quando la finestra cambia dimensione
    window.addEventListener('resize', function() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

window.initializeGlobe = initializeGlobe;