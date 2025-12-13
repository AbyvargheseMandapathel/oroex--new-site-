import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css';
import projectsData from '../../data/projects.json';
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="project-details-page">
                <div className="pd-not-found">
                    <h2>Project not found</h2>
                    <button className="pd-back-btn" onClick={() => navigate('/projects')}>
                        <ArrowLeft size={20} /> Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="project-details-page">
            <div className="pd-hero">
                <img
                    src={project.image}
                    alt={project.title}
                    className="pd-hero-image"
                />
                <div className="pd-overlay"></div>
                <div className="pd-hero-content">
                    <button className="pd-back-btn" onClick={() => navigate('/projects')}>
                        <ArrowLeft size={20} /> Back to Projects
                    </button>
                    <div className="pd-badge">CASE STUDY</div>
                    <h1 className="pd-title">{project.title}</h1>
                </div>
            </div>

            <div className="pd-main-content">
                <div className="pd-left-col">
                    <h2 className="pd-section-title">Project Overview</h2>
                    <p className="pd-description">
                        {project.description}
                    </p>
                    <p className="pd-description">
                        This project represents a significant milestone in our commitment to delivering robustness
                        and reliability in hazardous environments. By utilizing state-of-the-art materials and
                        adhering to strict international standards such as ATEX and IECEx, we ensured that every
                        component could withstand extreme conditions while maintaining optimal performance.
                    </p>
                </div>

                <div className="pd-right-col">
                    <div className="pd-sidebar-card">
                        <div className="pd-info-item">
                            <span className="pd-info-label"><MapPin size={16} style={{ display: 'inline', marginRight: '5px' }} /> Location</span>
                            <span className="pd-info-value">Abu Dhabi, UAE</span> {/* Placeholder data */}
                        </div>
                        <div className="pd-info-item">
                            <span className="pd-info-label"><Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} /> Year</span>
                            <span className="pd-info-value">2024</span> {/* Placeholder data */}
                        </div>
                        <div className="pd-info-item">
                            <span className="pd-info-label"><Tag size={16} style={{ display: 'inline', marginRight: '5px' }} /> Category</span>
                            <span className="pd-info-value">Industrial / Oil & Gas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
