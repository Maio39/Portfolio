import React from 'react';

const TripModal = ({ trip, onClose }) => {
    if (!trip) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-3xl font-bold mb-2 text-blue-400">{trip.title}</h2>
                <p className="text-sm text-neutral-400 mb-4">{trip.date}</p>

                <p className="text-lg mb-6 leading-relaxed text-neutral-300">
                    {trip.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {trip.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`Trip photo ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border border-neutral-800"
                        />
                    ))}
                </div>

                <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
                    <h3 className="text-xl font-semibold mb-3 text-yellow-400">Consigli di Viaggio</h3>
                    <ul className="list-disc list-inside space-y-2 text-neutral-300">
                        {trip.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TripModal;
