// satellites.js
import * as THREE from 'three';

export function createSatellites(scene) {
    const satelliteGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const satelliteMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    const satellite1 = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satellite1.position.set(2, 0, 0);
    scene.add(satellite1);

    const satellite2 = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satellite2.position.set(-2, 0, 0);
    scene.add(satellite2);
}
