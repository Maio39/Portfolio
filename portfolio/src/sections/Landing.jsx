import React, { useRef } from 'react';
import TravelGlobe from '../components/TravelGlobe';
import AirportBoard from '../components/AirportBoard';

const Landing = ({ onEnterPortfolio }) => {
    const globeRef = useRef();

    const handleSelectTrip = (trip) => {
        if (globeRef.current) {
            globeRef.current.simulateFlight(trip);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <TravelGlobe ref={globeRef} />

            <div className="absolute top-0 left-0 w-full p-6 flex justify-end items-start z-10">
                <div className="flex flex-col items-end gap-3">
                    <h1 className="text-2xl font-bold text-white tracking-widest uppercase drop-shadow-md pointer-events-none">
                        Marco Maier <span className="text-blue-500">.</span>
                    </h1>
                    <button
                        onClick={onEnterPortfolio}
                        className="group relative px-4 py-2 bg-white text-black font-semibold text-sm rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-1.5">
                            Esplora Portfolio
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0"></div>
                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Esplora Portfolio
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* Airport Board - Left Side */}
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-20 hidden lg:block">
                <AirportBoard onSelectTrip={handleSelectTrip} />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none lg:hidden">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
                    Esplora il Mondo
                </h2>
                <p className="text-lg text-neutral-300 mb-8 drop-shadow-md max-w-md mx-auto">
                    Un viaggio attraverso le mie esperienze e le mie avventure.
                </p>
            </div>

        </div>
    );
};

export default Landing;
