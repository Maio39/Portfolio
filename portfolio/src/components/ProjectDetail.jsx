import React from 'react';
import MaiErpDetails from './MaiErpDetails';
import { useTranslation } from 'react-i18next';

const ProjectDetail = ({ isOpen, onClose, project }) => {
    const { t } = useTranslation();

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
                        <div className="text-white flex flex-col gap-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">{project.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags?.map((tag, index) => (
                                            <span key={index} className="px-3 py-1 rounded-full bg-black-300/50 backdrop-blur-sm text-xs sm:text-sm font-medium text-gray-300 border border-white/10 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {project.link && (
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                                    >
                                        Visita il sito web
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            {project.img && (
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group ring-1 ring-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
                                    <img src={project.img} alt={project.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                                </div>
                            )}

                            <div className="bg-black-300/40 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                    </svg>
                                    Panoramica Progetto
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-8">{project.desc}</p>
                                
                                {project.subdesc && (
                                    <>
                                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-6"></div>
                                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                            </svg>
                                            Dettagli e Sviluppo
                                        </h3>
                                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-base sm:text-lg">
                                            <p>{project.subdesc}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
