import React, { useState } from 'react';
import './Projects.css';
import projectsData from '../../data/projects.json';
import { ArrowRight } from 'lucide-react';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(projectsData[0]);

    return (
        <section className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="projects-label">Projects</span>
                    <h2 className="projects-title">Where Expertise Meets Execution</h2>
                    <p className="projects-description">
                        Discover project deployments designed to meet strict international safety standards—delivering long-term reliability in explosive and industrial zones.
                    </p>
                </div>

                <div className="projects-content">
                    <div className="project-display">
                        <div className="project-image-container">
                            <img
                                src={activeProject.image}
                                alt={activeProject.title}
                                className="project-image"
                            />
                        </div>
                    </div>

                    <div className="project-list-container">
                        <div className="project-details-card">
                            <h3 className="project-card-title">{activeProject.title}</h3>
                            <p className="project-card-desc">{activeProject.description}</p>
                            <a href={activeProject.link} className="project-link">
                                KNOW MORE <ArrowRight size={16} />
                            </a>
                        </div>

                        <div className="project-list">
                            {projectsData.map((project) => (
                                <div
                                    key={project.id}
                                    className={`project-list-item ${activeProject.id === project.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveProject(project)}
                                    onClick={() => setActiveProject(project)}
                                >
                                    <span className="project-list-title">{project.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="projects-footer">
                    <button className="view-all-btn">
                        VIEW ALL <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Background Elements */}
            <div className="projects-bg-pattern"></div>
        </section>
    );
};

export default Projects;
