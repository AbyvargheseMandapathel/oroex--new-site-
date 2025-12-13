import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectsPage.css';
import { getProjects } from '../../api';
import Loader from '../Loader/Loader';
import { ArrowUpRight } from 'lucide-react';

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects()
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="projects-page">
            <div className="pp-header">
                <h1 className="pp-title">Featured Projects</h1>
                <p className="pp-subtitle">Showcasing our engineering excellence and successful deployments across the globe.</p>
            </div>

            <div className="pp-grid">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="pp-card"
                        onClick={() => navigate(`/projects/${project.slug}`)}
                    >
                        <div className="pp-image-wrapper">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="pp-image"
                            />
                        </div>
                        <div className="pp-content">
                            <span className="pp-id">0{project.order || project.id}</span>
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
