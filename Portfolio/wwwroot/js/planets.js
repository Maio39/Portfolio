// planets.js
import * as THREE from 'three';

export function createPlanets(scene) {
    const textureLoader = new THREE.TextureLoader();

    // Distanze reali dei pianeti (in Unità Astronomiche, ridotte per il modello 3D)
    const scale = 0.1; // Fattore di scala per adattare il sistema solare alla scena 3D
    const distances = {
        mars: 1.52 * scale,     // 1.52 AU (Marte)
        jupiter: 5.20 * scale,  // 5.20 AU (Giove)
        saturn: 9.58 * scale,   // 9.58 AU (Saturno)
        uranus: 19.18 * scale,  // 19.18 AU (Urano)
        neptune: 30.07 * scale  // 30.07 AU (Nettuno)
    };

    // Velocità orbitali approssimate (valori da scalare)
    const orbitalSpeeds = {
        mars: 0.01,        // Velocità di orbita di Marte
        jupiter: 0.005,    // Velocità di orbita di Giove
        saturn: 0.003,     // Velocità di orbita di Saturno
        uranus: 0.0015,    // Velocità di orbita di Urano
        neptune: 0.0008    // Velocità di orbita di Nettuno
    };

    // Funzione per creare il pianeta
    function createPlanet(textureUrl, size, position, orbitalSpeed) {
        const texture = textureLoader.load(textureUrl);
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            map: texture, 
            roughness: 0.7,
            metalness: 0.2
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.set(position.x, position.y, position.z);  // Posizione iniziale
        scene.add(planet);

        // Orbita
        const orbit = new THREE.Object3D();
        orbit.add(planet);
        scene.add(orbit);

        return { orbit, orbitalSpeed };
    }

    // Creazione di Marte
    const mars = createPlanet('images/8k_mars.jpg', 0.4, { x: distances.mars, y: 0, z: 0 }, orbitalSpeeds.mars);
    
    // Creazione di Giove
    const jupiter = createPlanet('images/8k_jupiter.jpg', 0.8, { x: distances.jupiter, y: 0, z: 0 }, orbitalSpeeds.jupiter);

    // Creazione di Saturno
    const saturn = createPlanet('images/8k_saturn.jpg', 0.7, { x: distances.saturn, y: 0, z: 0 }, orbitalSpeeds.saturn);

    // Creazione di Urano
    const uranus = createPlanet('images/2k_uranus.jpg', 0.6, { x: distances.uranus, y: 0, z: 0 }, orbitalSpeeds.uranus);

    // Creazione di Nettuno
    const neptune = createPlanet('images/2k_neptune.jpg', 0.5, { x: distances.neptune, y: 0, z: 0 }, orbitalSpeeds.neptune);

    // Funzione di animazione
    function animatePlanets() {
        // Calcola la rotazione delle orbite attorno alla Terra (simula l'orbita)
        mars.orbit.rotation.y += mars.orbitalSpeed; 
        jupiter.orbit.rotation.y += jupiter.orbitalSpeed;
        saturn.orbit.rotation.y += saturn.orbitalSpeed;
        uranus.orbit.rotation.y += uranus.orbitalSpeed;
        neptune.orbit.rotation.y += neptune.orbitalSpeed;
    }

    // Restituisci la funzione animatePlanets per essere usata nel ciclo di animazione
    return animatePlanets;
}
