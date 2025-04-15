import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import SpriteText from "three-spritetext";
import { trips } from "../constants";

const Travel = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [pinModel, setPinModel] = useState(null); // <-- per il modello

  // Carica il modello solo una volta
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("models/pin.glb", (gltf) => {
      console.log("Model loaded:", gltf.scene); // Verifica che il modello sia caricato
      setPinModel(gltf.scene);
    }, undefined, (error) => {
      console.error("Error loading the model:", error);
    });    
  }, []);

  // Gestione del resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* 
  altitude: 3 → globo intero
  altitude: 1.5 → continente
  altitude: 0.8 → paese
  altitude: 0.4 o meno → molto vicino 
  */
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: 41.8719, lng: 12.5674, altitude: 0.7 },
        2000 // durata dell'animazione in ms (opzionale)
      );
    }
  }, []);  

  const pins = Object.entries(trips).map(([id, trip]) => ({
    lat: trip.coords.lat,
    lng: trip.coords.lng,
    id,
    title: trip.title,
  }));

  const customThreeObject = (d) => {
    const group = new THREE.Group();
    
    if (pinModel) {
      const model = pinModel.clone();
    
      // TEST: scala molto più grande
      model.scale.set(100, 100, 100); // scala enorme
    
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      // Sposta il modello così che la base sia sull'origine
      model.position.y -= (center.y - box.min.y); // base del bounding box
      model.position.x -= center.x;
      model.position.z -= center.z;
    
      const { x, y, z } = globeRef.current.getCoords(d.lat, d.lng, 0.008);

      // vettore normale (dal centro verso la superficie)
      const normal = new THREE.Vector3(x, y, z).normalize();

      // altezza extra in base alla scala (più alto = più lo abbassi)
      const modelOffset = normal.clone().multiplyScalar(0.03); // sperimenta con il valore

      model.position.set(
        x - modelOffset.x,
        y - modelOffset.y,
        z - modelOffset.z
      );

    
      group.add(model);
      console.log("Adding model to globe at", d.lat, d.lng);

    }    
    
    return group;
  };

  return (
    <section id="travel" className="relative w-full h-full">
      <p className="head-text">My Travels</p>

      <div
        ref={containerRef}
        className="flex justify-center items-center rounded-xl w-full h-[600px] overflow-hidden mt-12"
      >
        {dimensions.width > 0 && pinModel && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,1)"
            globeImageUrl="textures/8k_earth_daymap.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            showAtmosphere
            atmosphereAltitude={0.25}
            showGraticules
            customLayerData={pins}
            customThreeObject={customThreeObject}
            onCustomLayerClick={(d) => setSelectedId(d.id)}
          />
        )}
      </div>

      {/* MODALE (come prima) */}
      {selectedId && (
        <div className="absolute inset-0 flex items-center justify-center z-45 pointer-events-none">
          <div className="relative bg-white/90 backdrop-blur-xl border-4 border-dashed border-[#19a3a3] shadow-2xl max-w-3xl w-full mx-6 p-8 rounded-xl animate-fadeIn pointer-events-auto">
            <button
              className="absolute top-2 right-4 text-black text-xl"
              onClick={() => setSelectedId(null)}
            >
              ✕
            </button>

            <h2 className="text-4xl font-bold text-[#003971] mb-2">{trips[selectedId].title}</h2>
            <p className="text-gray-700 mb-4 italic">{trips[selectedId].description}</p>

            {trips[selectedId].highlights?.length > 0 && (
              <>
                <h4 className="text-xl font-semibold mb-2 text-[#1c63a0]">📌 Luoghi indimenticabili:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-800">
                  {trips[selectedId].highlights.map((place, i) => (
                    <li key={i}>{place}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-wrap gap-4">
              {trips[selectedId].media.map((src, i) =>
                src.endsWith(".mp4") ? (
                  <video key={i} src={src} controls className="w-48 rounded shadow-md" />
                ) : (
                  <img key={i} src={src} alt="" className="w-48 rounded shadow-md" />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Travel;