import React from 'react';
import MaiErpDetails from './MaiErpDetails';

const ProjectDetail = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    const isMaiErp = project.id === 'maierp';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-black-200 border border-black-300 rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                <div className="sticky top-0 z-10 flex justify-end p-4 bg-black-200/90 backdrop-blur-md border-b border-white/10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black-300 hover:bg-white/10 transition-colors text-white-600 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 sm:p-10">
                    {isMaiErp ? (
                        <MaiErpDetails />
                    ) : (
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                            <p className="text-white-600 mb-6">{project.desc}</p>

                            {project.img && (
                                <div className="mb-8 rounded-xl overflow-hidden border border-black-300">
                                    <img src={project.img} alt={project.title} className="w-full h-auto object-cover" />
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.tags?.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 rounded-full bg-black-300 text-sm text-white-700 border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {project.subdesc && (
                                <div className="prose prose-invert max-w-none">
                                    <p>{project.subdesc}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
