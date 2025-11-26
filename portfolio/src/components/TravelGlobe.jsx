import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { trips } from '../data/trips';
import TripModal from './TripModal';

// Coordinate "base" in Italia (Roma)
const HOME_BASE_COORDS = {
  lat: 41.9028,
  lng: 12.4964,
  alt: 0.18,          // vicino alla superficie
  heading: 0,         // orientamento di default
  status: 'landedHome' // aereo atterrato in Italia
};

// Conversioni tra (lat, lng, alt) e coordinate 3D sul globo, compatibili con three-globe
const EARTH_RADIUS = 1; // three-globe usa un raggio unitario di base

const latLngAltToVector3 = (lat, lng, alt = 0) => {
  const radius = EARTH_RADIUS + alt;
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

const vector3ToLatLngAlt = (vec) => {
  const radius = vec.length();
  if (radius === 0) {
    return { lat: 0, lng: 0, alt: 0 };
  }
  const phi = Math.acos(vec.y / radius);
  const theta = Math.atan2(vec.z, -vec.x);

  const lat = 90 - THREE.MathUtils.radToDeg(phi);
  const lng = THREE.MathUtils.radToDeg(theta) - 180;
  const alt = radius - EARTH_RADIUS;

  return { lat, lng, alt };
};

const TravelGlobe = forwardRef((props, ref) => {
  const globeEl = useRef();
  const flightAnimRef = useRef(null);

  const [selectedTrip, setSelectedTrip] = useState(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [globeTexture, setGlobeTexture] = useState("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
  const [flagTexture, setFlagTexture] = useState(null);
  const [planeModel, setPlaneModel] = useState(null);
  // Posizione e orientamento corrente dell'aereo (sia a terra che in volo)
  const [planePosition, setPlanePosition] = useState(HOME_BASE_COORDS);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setGlobeTexture("//unpkg.com/three-globe/example/img/earth-night.jpg");
    } else {
      setGlobeTexture("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    }

    // Percorso asset in base all'URL di base Vite (funziona in dev e in produzione /Portfolio)
    const baseUrl = import.meta.env.BASE_URL || '/';

    // Load Flag Texture
    new THREE.TextureLoader().load(`${baseUrl}wolf_flag.png`, (texture) => {
      setFlagTexture(texture);
    });

    // Load Boeing 737 3D Model
    const loader = new GLTFLoader();
    loader.load(`${baseUrl}models/boeing737.glb`, (gltf) => {
      const model = gltf.scene;

      // Scala iniziale del modello (molto più piccola)
      model.scale.set(0.6, 0.6, 0.6);

      // Leggera emissività per renderlo visibile
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.needsUpdate = true;
          child.material.emissive = new THREE.Color(0x444444);
          child.material.emissiveIntensity = 0.5;
        }
      });

      console.log('Boeing 737 model loaded successfully:', model);
      setPlaneModel(model);
    },
      (progress) => {
        console.log('Loading Boeing 737:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading Boeing 737 model:', error);
      });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Vista iniziale: Italia (Roma)
      globeEl.current.pointOfView({
        lat: HOME_BASE_COORDS.lat,
        lng: HOME_BASE_COORDS.lng,
        altitude: 2.0
      });
      globeEl.current.controls().autoRotate = false;
      globeEl.current.controls().enableZoom = true;
    }
  }, []);

  const handleCloseModal = () => {
    setSelectedTrip(null);

    // Ferma eventuale animazione in corso
    if (flightAnimRef.current) {
      cancelAnimationFrame(flightAnimRef.current);
      flightAnimRef.current = null;
    }

    // Riporta l'aereo alla base in Italia (atterrato)
    setPlanePosition(HOME_BASE_COORDS);

    if (globeEl.current) {
      // Ritorno visuale su Roma
      globeEl.current.pointOfView({
        lat: HOME_BASE_COORDS.lat,
        lng: HOME_BASE_COORDS.lng,
        altitude: 2.0
      }, 2000);
    }
  };

  const arcsData = useMemo(() => trips.map(trip => ({
    startLat: trip.startLat,
    startLng: trip.startLng,
    endLat: trip.endLat,
    endLng: trip.endLng,
    color: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)'],
    trip: trip
  })), []);

  const customPinObject = () => {
    const group = new THREE.Group();

    // Hitbox for easier clicking
    const hitbox = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 6, 8),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, depthWrite: false })
    );
    hitbox.position.y = 3;
    group.add(hitbox);

    // Flag Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 5, 8),
      new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.8, roughness: 0.2 })
    );
    pole.position.y = 2.5;
    group.add(pole);

    // Flag Cloth
    if (flagTexture) {
      const flagGeometry = new THREE.PlaneGeometry(3, 2);
      const flagMaterial = new THREE.MeshBasicMaterial({
        map: flagTexture,
        side: THREE.DoubleSide,
        transparent: true
      });
      const flag = new THREE.Mesh(flagGeometry, flagMaterial);
      flag.position.set(1.5, 4, 0); // Attach to top of pole
      group.add(flag);
    } else {
      // Fallback if texture not loaded yet
      const flagGeometry = new THREE.PlaneGeometry(3, 2);
      const flagMaterial = new THREE.MeshBasicMaterial({ color: '#ef4444', side: THREE.DoubleSide });
      const flag = new THREE.Mesh(flagGeometry, flagMaterial);
      flag.position.set(1.5, 4, 0);
      group.add(flag);
    }

    group.scale.set(0.5, 0.5, 0.5);
    return group;
  };

  const customPlaneObject = (obj) => {
    // Se il modello del Boeing è caricato, usalo
    // If the Boeing 737 model is loaded, use it
    if (planeModel) {
      const clone = planeModel.clone(true); // Deep clone

      // Scala contenuta per non risultare enorme sul globo
      clone.scale.set(0.45, 0.45, 0.45);

      // Assicurati che i materiali siano visibili
      clone.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.needsUpdate = true;
          child.material.side = THREE.DoubleSide;
          child.material.transparent = false;
          child.material.opacity = 1;
          child.material.emissive = new THREE.Color(0xffffff);
          child.material.emissiveIntensity = 0.4;
        }
      });

      // Orientamento: vista dall'alto, naso nella direzione del volo (heading attorno all'asse "su")
      if (obj && typeof obj.heading === 'number') {
        clone.rotation.y = obj.heading;
      }

      // Vista dall'alto: niente beccheggio/inclinazione verticale
      clone.rotation.x = 0;
      clone.rotation.z = 0;

      return clone;
    }

    // Fallback to basic geometry if model isn't loaded yet
    const group = new THREE.Group();

    // Fuselage
    const fuselage = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.6, 5, 4, 8),
      new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.5, roughness: 0.2 })
    );
    fuselage.rotation.z = Math.PI / 2;

    // Wings
    const wings = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.1, 6),
      new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.5, roughness: 0.2 })
    );

    // Tail
    const tail = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.1, 2.5),
      new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.5, roughness: 0.2 })
    );
    tail.position.set(-2, 0.5, 0);

    // Vertical Stabilizer
    const vStab = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1.5, 0.1),
      new THREE.MeshStandardMaterial({ color: '#ef4444' }) // Red tail
    );
    vStab.position.set(-2, 1, 0);

    group.add(fuselage);
    group.add(wings);
    group.add(tail);
    group.add(vStab);

    // Orienta il fallback nella direzione del volo
    if (obj && typeof obj.heading === 'number') {
      group.rotation.y = obj.heading;
    }

    // Vista dall'alto anche per il fallback
    group.rotation.x = 0;
    group.rotation.z = 0;

    // Scala moderata
    group.scale.set(0.12, 0.12, 0.12);
    return group;
  };

  // Dati per bandiere + aereo
  const objectsData = useMemo(() => {
    const flagObjects = trips.map(trip => ({
      ...trip,
      objectType: 'flag'
    }));

    const planeObject = {
      id: 'plane',
      objectType: 'plane',
      lat: planePosition.lat,
      lng: planePosition.lng,
      alt: planePosition.alt,
      heading: planePosition.heading,
      status: planePosition.status
    };

    return [...flagObjects, planeObject];
  }, [planePosition]);

  // Espone la funzione di simulazione volo al genitore
  useImperativeHandle(ref, () => ({
    simulateFlight: (trip) => {
      setSelectedTrip(null);

      // Ferma eventuale animazione precedente
      if (flightAnimRef.current) {
        cancelAnimationFrame(flightAnimRef.current);
        flightAnimRef.current = null;
      }

      const startLat = HOME_BASE_COORDS.lat;
      const startLng = HOME_BASE_COORDS.lng;
      const endLat = trip.endLat;
      const endLng = trip.endLng;
      const duration = 6000; // ms, volo un po' più lungo e morbido
      const startTime = performance.now();

      // Calcola la direzione (bearing) del volo in radianti
      const toRad = (deg) => (deg * Math.PI) / 180;

      const φ1 = toRad(startLat);
      const φ2 = toRad(endLat);
      const Δλ = toRad(endLng - startLng);
      const y = Math.sin(Δλ) * Math.cos(φ2);
      const x = Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
      let bearing = Math.atan2(y, x); // [-π, π]

      // Porta il bearing in [0, 2π)
      if (bearing < 0) bearing += 2 * Math.PI;

      const heading = bearing;

      // Pre-calcola i vettori 3D dei punti di partenza e arrivo sul globo
      const startVec = latLngAltToVector3(startLat, startLng, HOME_BASE_COORDS.alt);
      const endVec = latLngAltToVector3(endLat, endLng, HOME_BASE_COORDS.alt);

      // Posiziona subito l'aereo sulla base, già orientato verso la destinazione (pronto al decollo)
      setPlanePosition({
        lat: startLat,
        lng: startLng,
        alt: HOME_BASE_COORDS.alt,
        heading,
        status: 'flying'
      });

      if (globeEl.current) {
        globeEl.current.controls().autoRotate = false;

        // Zoom iniziale sulla partenza (Italia)
        globeEl.current.pointOfView({
          lat: startLat,
          lng: startLng,
          altitude: 2.0
        }, 1200);

        // Imposta fin da subito una transizione fluida della camera verso la destinazione
        globeEl.current.pointOfView({
          lat: endLat,
          lng: endLng,
          altitude: 1.6
        }, duration + 1200);
      }

      const animate = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);

        // Interpolazione sferica approssimata tra i due vettori per seguire la curva del globo
        const currentVec = new THREE.Vector3().copy(startVec).lerp(endVec, t).normalize()
          .multiplyScalar(EARTH_RADIUS + HOME_BASE_COORDS.alt);
        const { lat: currentLat, lng: currentLng, alt: currentAlt } = vector3ToLatLngAlt(currentVec);

        setPlanePosition({
          lat: currentLat,
          lng: currentLng,
          alt: currentAlt,
          heading,
          status: t < 1 ? 'flying' : 'landedDestination'
        });

        if (t < 1) {
          flightAnimRef.current = requestAnimationFrame(animate);
        } else {
          flightAnimRef.current = null;
          // A fine volo, apri la scheda del viaggio
          setSelectedTrip(trip);
        }
      };

      // Parte l'animazione leggermente dopo lo zoom iniziale
      setTimeout(() => {
        flightAnimRef.current = requestAnimationFrame(animate);
      }, 1000);
    }
  }));

  return (
    <div className="relative w-full h-full bg-black">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl={globeTexture}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        // Arcs
        arcsData={arcsData}
        arcColor={() => "rgba(255, 255, 255, 0.1)"}
        arcStroke={0.5}
        arcDashLength={1}
        arcDashGap={0}

        // Objects: bandiere + aereo
        objectsData={objectsData}
        objectLat={(obj) => obj.objectType === 'plane' ? obj.lat : obj.endLat}
        objectLng={(obj) => obj.objectType === 'plane' ? obj.lng : obj.endLng}
        objectAltitude={(obj) => obj.objectType === 'plane' ? obj.alt : 0}
        objectThreeObject={(obj) =>
          obj.objectType === 'plane' ? customPlaneObject(obj) : customPinObject(obj)
        }
        onObjectClick={(obj) => {
          // Solo clic sulle bandiere fa partire il volo
          if (obj.objectType === 'flag' && ref?.current) {
            ref.current.simulateFlight(obj);
          }
        }}
        onObjectHover={(obj) => {
          document.body.style.cursor = obj ? 'pointer' : 'default';
        }}
      />

      {selectedTrip && (
        <TripModal
          trip={selectedTrip}
          onClose={handleCloseModal}
        />
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-10 w-full">
        <p className="text-neutral-400 text-sm mb-2 bg-black/50 inline-block px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
          Seleziona un volo dal tabellone o clicca sulla bandiera per partire
        </p>
      </div>
    </div>
  );
});

export default TravelGlobe;
