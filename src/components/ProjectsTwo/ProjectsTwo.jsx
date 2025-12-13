import React, { useState } from 'react';
import './ProjectsTwo.css';
import projectsData from '../../data/projects.json';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectsTwo = () => {
    const [activeProject, setActiveProject] = useState(projectsData[0]);

    const handleNext = () => {
        const currentIndex = projectsData.findIndex(p => p.id === activeProject.id);
        const nextIndex = (currentIndex + 1) % projectsData.length;
        setActiveProject(projectsData[nextIndex]);
    };

    const handlePrev = () => {
        const currentIndex = projectsData.findIndex(p => p.id === activeProject.id);
        const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
        setActiveProject(projectsData[prevIndex]);
    };

    return (
        <section className="projects-two-section">
            <div className="p2-bg-grid"></div>

            <div className="projects-two-container">
                <div className="projects-two-header">
                    <div className="p2-label-wrapper">
                        <span className="p2-label">FEATURED PROJECTS</span>
                        <div className="p2-label-line"></div>
                    </div>
                    <h2 className="p2-title">Engineering Excellence <br /><span className="p2-title-highlight">In Action</span></h2>
                </div>

                <div className="projects-two-content">
                    {/* Left: Active Project Display */}
                    <div className="p2-display-area">
                        <div className="p2-image-card">
                            <img
                                src={activeProject.image}
                                alt={activeProject.title}
                                className="p2-image"
                            />
                            <div className="p2-image-overlay">
                                <div className="p2-overlay-content">
                                    <span className="p2-overlay-id">0{activeProject.id}</span>
                                    <h3>{activeProject.title}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="p2-details-panel">
                            <div className="p2-details-text-action">
                                <p className="p2-desc">{activeProject.description}</p>
                                <a href={activeProject.link} className="p2-link-btn">
                                    VIEW CASE STUDY <ArrowUpRight size={18} />
                                </a>
                            </div>

                            {/* Mobile Navigation Controls */}
                            <div className="p2-mobile-nav">
                                <button className="p2-nav-btn" onClick={handlePrev}>
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="p2-nav-dots">
                                    {projectsData.map((p) => (
                                        <div
                                            key={p.id}
                                            className={`p2-nav-dot ${p.id === activeProject.id ? 'active' : ''}`}
                                            onClick={() => setActiveProject(p)}
                                        ></div>
                                    ))}
                                </div>
                                <button className="p2-nav-btn" onClick={handleNext}>
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <button className="p2-view-all-btn-mobile">
                                VIEW ALL PROJECTS
                            </button>
                        </div>
                    </div>

                    {/* Right: Project List (Hidden on Mobile) */}
                    <div className="p2-list-area">
                        <div className="p2-list-header">
                            <span>SELECT PROJECT</span>
                        </div>
                        <div className="p2-list">
                            {projectsData.map((project) => (
                                <div
                                    key={project.id}
                                    className={`p2-list-item ${activeProject.id === project.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveProject(project)}
                                    onClick={() => setActiveProject(project)}
                                >
                                    <span className="p2-item-num">0{project.id}</span>
                                    <span className="p2-item-title">{project.title}</span>
                                    <ArrowRight size={16} className="p2-item-arrow" />
                                </div>
                            ))}
                        </div>
                        <div className="p2-view-all-wrapper">
                            <button className="p2-view-all-btn">
                                VIEW ALL PROJECTS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsTwo;
