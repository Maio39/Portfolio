import React, { useState } from 'react';
import { portfolioProjects } from '../constants';
import ProjectDetail from '../components/ProjectDetail';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section className='c-space my-20' id='projects'>
            <p className='head-text'>My Projects</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
                {portfolioProjects.map((project) => (
                    <div
                        key={project.id}
                        className='bg-black-200 border border-black-300 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:shadow-xl group cursor-pointer flex flex-col h-full'
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className='relative w-full h-48 mb-5 overflow-hidden rounded-xl bg-black-300'>
                            {/* Placeholder for project image if not available */}
                            {project.img ? (
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-4xl'>
                                    🚀
                                </div>
                            )}

                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                <span className='text-white font-semibold px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20'>
                                    View Details
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-col flex-grow'>
                            <h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>
                                {project.title}
                            </h3>
                            <p className='text-white-600 text-sm line-clamp-3 mb-4 flex-grow'>
                                {project.desc}
                            </p>

                            <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t border-black-300'>
                                {project.tags?.slice(0, 3).map((tag, index) => (
                                    <span key={index} className='text-xs px-2 py-1 rounded bg-black-300 text-white-700'>
                                        {tag}
                                    </span>
                                ))}
                                {project.tags?.length > 3 && (
                                    <span className='text-xs px-2 py-1 rounded bg-black-300 text-white-700'>
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProjectDetail
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </section>
    );
};

export default Projects;
