// Importa il modulo THREE.js per la creazione di grafica 3D
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// Importa OrbitControls per consentire il controllo dell'orbita della camera
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
// Dichiarazione delle variabili globali
let camera, scene, renderer, controls, globe, clock, sun, targetSunPosition;

export function initializeGlobe(canvasId) {
    // Funzione per inizializzare il globo
    const canvas = document.getElementById(canvasId);           // Ottiene l'elemento canvas dal DOM usando l'ID fornito
    renderer = new THREE.WebGLRenderer({ canvas: canvas });     // Crea un renderer WebGL e lo associa al canvas
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);  // Imposta le dimensioni del renderer in base alle dimensioni del canvas
    clock = new THREE.Clock();                                  // Crea un orologio per tenere traccia del tempo

    // Crea una camera prospettica con un campo visivo di 25 gradi, rapporto d'aspetto basato sul canvas, e piani di clipping vicino e lontano
    camera = new THREE.PerspectiveCamera(25, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(4.5, 2, 3);                           // Imposta la posizione iniziale della camera
    scene = new THREE.Scene();                                  // Crea una nuova scena

    //// sun
    //const sun = new THREE.DirectionalLight( '#ffffff', 2 );             // Crea una luce direzionale per simulare il sole
    //sun.position.set( 0, 0, 3 );                                        // Imposta la posizione della luce solare
    //scene.add(sun);                                                   // Aggiunge la luce solare alla scena

    // Modifica la creazione della luce
    sun = new THREE.DirectionalLight('#ffffff', 2.5);
    sun.position.set(1, 0, 0); // Posizione iniziale del sole

    // All'interno di initializeGlobe, dopo aver creato la luce:
    calculateSunPosition();
    sun.position.copy(targetSunPosition);
    scene.add(sun);

    // uniforms
    const atmosphereDayColor = new THREE.Color('#4db2ff');            // Colore dell'atmosfera durante il giorno
    const atmosphereTwilightColor = new THREE.Color('#bc490b');       // Colore dell'atmosfera durante il crepuscolo
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
            sunPosition: { value: new THREE.Vector3() }, // Nuovo uniform
            time: { value: 0 } // Per effetti dinamici
        },
        vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vWorldNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D bumpRoughnessCloudsTexture;
        uniform vec3 sunPosition;
        uniform float time;

        varying vec2 vUv;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
            // Calcola la direzione della luce
            vec3 lightDir = normalize(sunPosition - vWorldPosition);
            
            // Intensità della luce
            vec3 globeNormal = normalize(vWorldPosition);
            float diff = dot(globeNormal, normalize(sunPosition));
            diff = smoothstep(-0.1, 0.1, diff);

            // Texture mixing
            vec4 dayColor = texture2D(dayTexture, vUv);
            vec4 nightColor = texture2D(nightTexture, vUv);
            vec4 clouds = texture2D(bumpRoughnessCloudsTexture, vUv);
            
            // Effetto luci notturne
            float nightLights = smoothstep(0.7, 0.9, nightColor.r);
            nightColor.rgb += nightLights * vec3(1.0, 0.9, 0.5) * (1.0 - diff);
            
            // Mix finale
            vec4 finalColor = mix(nightColor, dayColor, diff);
            
            // Aggiungi nuvole con effetto giorno/notte
            finalColor.rgb += clouds.rgb * 0.15 * (diff + 0.2);
            
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

// Aggiungi questa funzione per calcolare la rotazione iniziale in base all'ora
function calculateInitialRotation() {
    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;

    // La terra ruota 360 gradi in 24 ore -> 15 gradi all'ora
    // Sottraiamo 90 gradi per allineare con la texture (posizione 0 è a mezzanotte UTC)
    const targetRotation = (utcHours * -15 + 90) * (Math.PI / 180);

    return targetRotation;
}

// Modifica la funzione animate così:
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    calculateSunPosition();

    // Aggiorna la posizione del sole
    sun.position.copy(targetSunPosition);
    globe.material.uniforms.sunPosition.value.copy(sun.position);
    globe.material.uniforms.time.value = performance.now() / 1000;

    controls.update();
    renderer.render(scene, camera);
}

// Aggiungi questa funzione per calcolare la posizione del sole
function calculateSunPosition() {
    if (!targetSunPosition) {
        targetSunPosition = new THREE.Vector3();
    }

    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;

    // La Terra ruota di 360° in 24 ore -> 15° all'ora
    // Spostiamo di 180° (π radianti) per allineare correttamente la luce
    const sunAngle = ((utcHours / 24) * Math.PI * 2) - Math.PI;

    // Posizioniamo il sole in modo che illumini correttamente il globo
    targetSunPosition.set(
        Math.cos(sunAngle) * 5,
        Math.sin(23.44 * (Math.PI / 180)) * 5, // Inclinazione assiale della Terra (23.44°)
        Math.sin(sunAngle) * 5
    );
}

window.initializeGlobe = initializeGlobe;   // Esporta la funzione initializeGlobe nel contesto globale