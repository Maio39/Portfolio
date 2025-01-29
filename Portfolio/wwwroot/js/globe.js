// Importa il modulo THREE.js per la creazione di grafica 3D
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// Importa OrbitControls per consentire il controllo dell'orbita della camera
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
// Dichiarazione delle variabili globali
let camera, scene, renderer, controls, globe, clock;

export function initializeGlobe(canvasId) {
    // Funzione per inizializzare il globo
    const canvas = document.getElementById(canvasId);           // Ottiene l'elemento canvas dal DOM usando l'ID fornito
    renderer = new THREE.WebGLRenderer({ canvas: canvas });     // Crea un renderer WebGL e lo associa al canvas
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);  // Imposta le dimensioni del renderer in base alle dimensioni del canvas
    clock = new THREE.Clock();                                  // Crea un orologio per tenere traccia del tempo

    // Crea una camera prospettica con un campo visivo di 25 gradi, rapporto d'aspetto basato sul canvas, e piani di clipping vicino e lontano
    camera = new THREE.PerspectiveCamera( 25, canvas.clientWidth / canvas.clientHeight, 0.1, 100 );
    camera.position.set( 4.5, 2, 3 );                           // Imposta la posizione iniziale della camera
    scene = new THREE.Scene();                                  // Crea una nuova scena

    // sun
    const sun = new THREE.DirectionalLight( '#ffffff', 2 );             // Crea una luce direzionale per simulare il sole
    sun.position.set( 0, 0, 3 );                                        // Imposta la posizione della luce solare
    scene.add( sun );                                                   // Aggiunge la luce solare alla scena

    // uniforms
    const atmosphereDayColor = new THREE.Color( '#4db2ff' );            // Colore dell'atmosfera durante il giorno
    const atmosphereTwilightColor = new THREE.Color( '#bc490b' );       // Colore dell'atmosfera durante il crepuscolo
    const roughnessLow = 0.25;                                          // Valore di rugosità basso
    const roughnessHigh = 0.35;                                         // Valore di rugosità alto

    // textures
    const textureLoader = new THREE.TextureLoader();    // Crea un caricatore di texture

    // Carica la texture della Terra di giorno
    const dayTexture = textureLoader.load(
        'images/earth_texture_8k.jpg',
        () => console.log("Day texture loaded!"), // Callback onLoad
        undefined, // Callback onProgress (opzionale)
        (err) => console.error("Error loading day texture:", err) // Callback onError
    );
    dayTexture.colorSpace = THREE.SRGBColorSpace;       // Imposta lo spazio colore della texture
    dayTexture.anisotropy = 8;                          // Imposta l'anisotropia della texture per migliorare la qualità
    
    // Carica la texture della Terra di notte
    const nightTexture = textureLoader.load(
        'images/8k_earth_nightmap.jpg',
        () => console.log("Night texture loaded!"),
        undefined,
        (err) => console.error("Error loading night texture:", err)
    );
    nightTexture.colorSpace = THREE.SRGBColorSpace;             // Imposta lo spazio colore della texture
    nightTexture.anisotropy = 8;                                // Imposta l'anisotropia della texture per migliorare la qualità

    // Carica la texture per le nuvole, la rugosità e il bump mapping
    const bumpRoughnessCloudsTexture = textureLoader.load(
        'images/earth_bump_roughness_clouds_4096.jpg',
        () => console.log("Bump texture loaded!"),
        undefined,
        (err) => console.error("Error loading bump texture:", err)
    );
    bumpRoughnessCloudsTexture.anisotropy = 8;          // Imposta l'anisotropia della texture per migliorare la qualità

    // globe
    const globeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            dayTexture: { value: dayTexture },
            nightTexture: { value: nightTexture },
            bumpRoughnessCloudsTexture: { value: bumpRoughnessCloudsTexture },
            lightIntensity: { value: 0.5 } // Intensità della luce per schiarire la texture notturna
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal); // Normale trasformata

                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform sampler2D bumpRoughnessCloudsTexture;
            uniform float lightIntensity;

            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
                // Ottieni i colori dalle texture
                vec4 dayColor = texture2D(dayTexture, vUv);
                vec4 nightColor = texture2D(nightTexture, vUv);
                vec4 clouds = texture2D(bumpRoughnessCloudsTexture, vUv);

                // Simula la direzione della luce dal lato positivo dell'asse Z
                float lightingFactor = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
                lightingFactor = clamp(lightingFactor, 0.0, 1.0);  // Mantiene il valore tra 0 e 1

                // Miscela tra giorno e notte in base alla luce
                vec4 finalColor = mix(nightColor, dayColor, lightingFactor);

                // Aggiungi le nuvole
                finalColor.rgb += clouds.rgb * 0.2;

                gl_FragColor = finalColor;
            }
        `
    });

    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);  // Crea una geometria sferica per il globo con raggio 1 e 32 segmenti
    globe = new THREE.Mesh(globeGeometry, globeMaterial);       // Crea una mesh combinando la geometria del globo e il materiale
    scene.add(globe);                                           // Aggiunge il globo alla scena
    
    // Configura OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);  // Crea i controlli dell'orbita per la camera
    controls.enableDamping = true;                              // Abilita lo smorzamento dei controlli
    controls.minDistance = 0.1;                                 // Imposta la distanza minima di zoom
    controls.maxDistance = 50;                                  // Imposta la distanza massima di zoom
    window.addEventListener('resize', onWindowResize);          // Aggiunge un listener per l'evento di ridimensionamento della finestra
    animate();                                                  // Avvia l'animazione
}

function onWindowResize() {                                     // Funzione chiamata quando la finestra viene ridimensionata
    camera.aspect = window.innerWidth / window.innerHeight;     // Aggiorna il rapporto d'aspetto della camera
    camera.updateProjectionMatrix();                            // Aggiorna la matrice di proiezione della camera
    renderer.setSize(window.innerWidth, window.innerHeight);    // Aggiorna le dimensioni del renderer
}

//function animate() {                        // Funzione di animazione
//    requestAnimationFrame(animate);         // Richiede il prossimo frame di animazione
//    const delta = clock.getDelta();         // Ottiene il tempo trascorso dall'ultimo frame
//    globe.rotation.y += delta * 0.025;      // Ruota il globo in base al tempo trascorso
//    controls.update();                      // Aggiorna i controlli dell'orbita
//    renderer.render(scene, camera);         // Renderizza la scena dal punto di vista della camera
//}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    globe.rotation.y += delta * 0.025;

    // Definisce la direzione della luce in base alla rotazione del globo
    const lightDirection = new THREE.Vector3(0, 0, 1);
    lightDirection.applyQuaternion(globe.quaternion);
    const lightIntensity = Math.max(0, lightDirection.z); // Più è vicino a 1, più è illuminato

    // Aggiorna lo shader con l'intensità della luce
    globe.material.uniforms.lightIntensity.value = lightIntensity;
    globe.material.uniforms.lightIntensity.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
}


window.initializeGlobe = initializeGlobe;   // Esporta la funzione initializeGlobe nel contesto globale