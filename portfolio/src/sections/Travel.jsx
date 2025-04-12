import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import SpriteText from "three-spritetext";
import { trips } from "../constants";

const Travel = () => {
  const globeRef = useRef();
  const [selectedId, setSelectedId] = useState(null);

  const pins = Object.entries(trips).map(([id, trip]) => ({
    lat: trip.coords.lat,
    lng: trip.coords.lng,
    id,
    title: trip.title,
  }));

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 3 });
    }
  }, []);

  return (
    <section id="travel" className="w-full h-full">
    <p className="head-text">My Travels</p>

    {/* GLOBO */}
      <div className="flex justify-center items-center rounded-xl w-full h-[600px] overflow-hidden mt-12">
        <Globe
          ref={globeRef}
          width={undefined}
          height={undefined}
          backgroundColor="rgba(0,0,0,1)"
          globeImageUrl="textures/8k_earth_daymap.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereAltitude={0.25}
          showGraticules
          customLayerData={pins}
          customThreeObject={(d) => {
            const sprite = new SpriteText("📍");
            sprite.color = "white";
            sprite.textHeight = 2.5;
            return sprite;
          }}
          customThreeObjectUpdate={(obj, d) => {
            obj.position.z += Math.sin(Date.now() * 0.002 + d.lat) * 0.01;
          }}
          onCustomLayerClick={(d) => setSelectedId(d.id)}
        />
      </div>

      {/* MODALE TRAVEL JOURNAL */}
      {selectedId && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
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