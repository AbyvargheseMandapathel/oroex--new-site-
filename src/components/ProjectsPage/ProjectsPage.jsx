import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsPage.css';
import projectsData from '../../data/projects.json';
import { ArrowUpRight } from 'lucide-react';

const ProjectsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="projects-page">
            <div className="pp-header">
                <h1 className="pp-title">Featured Projects</h1>
                <p className="pp-subtitle">Showcasing our engineering excellence and successful deployments across the globe.</p>
            </div>

            <div className="pp-grid">
                {projectsData.map((project) => (
                    <div
                        key={project.id}
                        className="pp-card"
                        onClick={() => navigate(`/projects/${project.id}`)}
                    >
                        <div className="pp-image-wrapper">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="pp-image"
                            />
                        </div>
                        <div className="pp-content">
                            <span className="pp-id">0{project.id}</span>
                            <h3 className="pp-card-title">{project.title}</h3>
                            <div className="pp-link">
                                VIEW CASE STUDY <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
