import React from 'react';
import { trips } from '../data/trips';

const AirportBoard = ({ onSelectTrip }) => {
    return (
        <div className="bg-black/80 backdrop-blur-md border border-neutral-800 rounded-xl overflow-hidden shadow-2xl w-full max-w-md font-mono">
            <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex justify-between items-center">
                <h3 className="text-yellow-500 text-xl font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    Departures
                </h3>
                <span className="text-neutral-500 text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="p-2">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-neutral-500 text-xs uppercase border-b border-neutral-800">
                            <th className="p-3 font-normal">Destination</th>
                            <th className="p-3 font-normal">Date</th>
                            <th className="p-3 font-normal text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip, index) => (
                            <tr
                                key={trip.id}
                                onClick={() => onSelectTrip(trip)}
                                className="group cursor-pointer hover:bg-white/5 transition-colors border-b border-neutral-800/50 last:border-0"
                            >
                                <td className="p-3 text-white font-bold group-hover:text-yellow-400 transition-colors">
                                    {trip.title.split(' ').slice(-1)[0].toUpperCase()} {/* Estrae l'ultima parola come "città" approx */}
                                </td>
                                <td className="p-3 text-neutral-400 text-sm">
                                    {trip.date.split(' ')[1]} {/* Estrae l'anno */}
                                </td>
                                <td className="p-3 text-right">
                                    <span className={`text-xs px-2 py-1 rounded ${index % 2 === 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'} group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition-colors`}>
                                        {index % 2 === 0 ? 'BOARDING' : 'ON TIME'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-neutral-900/50 p-3 text-center border-t border-neutral-800">
                <p className="text-neutral-600 text-xs uppercase tracking-wider">Select a flight to start journey</p>
            </div>
        </div>
    );
};

export default AirportBoard;
