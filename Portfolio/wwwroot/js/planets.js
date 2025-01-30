// planets.js
import * as THREE from 'three';

export function createPlanets(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Creazione di Marte
    const marsTexture = textureLoader.load('images/8k_mars.jpg');
    const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const marsMaterial = new THREE.MeshStandardMaterial({
        map: marsTexture, // Applica la texture di Marte
        roughness: 0.8,
        metalness: 0.1
    });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.position.set(5, 0, 0);  // Posizione iniziale di Marte
    scene.add(mars);

    // Creazione di Giove
    const jupiterTexture = textureLoader.load('images/8k_jupiter.jpg');
    const jupiterGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        map: jupiterTexture, // Applica la texture di Giove
        roughness: 0.6,
        metalness: 0.3
    });
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiter.position.set(10, 0, 0);  // Posizione iniziale di Giove
    scene.add(jupiter);

    // Creazione dell'orbita di Marte attorno alla Terra
    const marsOrbit = new THREE.Object3D();
    marsOrbit.add(mars);
    scene.add(marsOrbit);

    // Creazione dell'orbita di Giove attorno alla Terra
    const jupiterOrbit = new THREE.Object3D();
    jupiterOrbit.add(jupiter);
    scene.add(jupiterOrbit);

    // Funzione di animazione
    function animatePlanets() {
        // Calcola la rotazione delle orbite attorno alla Terra (simula l'orbita)
        marsOrbit.rotation.y += 0.01;  // Velocità di orbita di Marte
        jupiterOrbit.rotation.y += 0.005;  // Velocità di orbita di Giove
    }

    // Restituisci la funzione animatePlanets per essere usata nel ciclo di animazione
    return animatePlanets;
}
