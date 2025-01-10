function initializeGlobe(canvasId) {
    var canvas = document.getElementById(canvasId);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Carica la texture del mappamondo
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('images/earth_texture_8k.jpg');

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Aggiungi luci
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Configura OrbitControls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Abilita l'inerzia
    controls.dampingFactor = 0.25;
    controls.enableZoom = true; // Abilita lo zoom

    camera.position.z = 15;

    var animate = function () {
        requestAnimationFrame(animate);
        controls.update(); // Aggiorna i controlli
        globe.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

    // Aggiungi un listener per ridimensionare il renderer quando la finestra cambia dimensione
    window.addEventListener('resize', function () {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

window.initializeGlobe = initializeGlobe;