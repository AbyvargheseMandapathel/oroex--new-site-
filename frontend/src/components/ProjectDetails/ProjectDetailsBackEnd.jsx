import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css'; // Reusing CSS
import '../RichText.css'; // Rich Text Styles
import { getProjectDetails } from '../../api';
import { ArrowLeft, Calendar, MapPin, Tag, User } from 'lucide-react';

const ProjectDetailsBackEnd = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProjectDetails(slug)
            .then(data => {
                setProject(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch project details", err);
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="pd-loading">Loading Project...</div>;

    if (error || !project) {
        return (
            <div className="project-details-page">
                <div className="pd-not-found">
                    <h2>{error ? 'Error loading project' : 'Project not found'}</h2>
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
                    {project.long_description && (
                        <div
                            className="pd-rich-text"
                            dangerouslySetInnerHTML={{ __html: project.long_description }}
                        />
                    )}
                </div>

                <div className="pd-right-col">
                    <div className="pd-sidebar-card">
                        {project.location && (
                            <div className="pd-info-item">
                                <span className="pd-info-label"><MapPin size={16} style={{ display: 'inline', marginRight: '5px' }} /> Location</span>
                                <span className="pd-info-value">{project.location}</span>
                            </div>
                        )}
                        {project.date && (
                            <div className="pd-info-item">
                                <span className="pd-info-label"><Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} /> Date</span>
                                <span className="pd-info-value">{project.date}</span>
                            </div>
                        )}
                        {project.client && (
                            <div className="pd-info-item">
                                <span className="pd-info-label"><User size={16} style={{ display: 'inline', marginRight: '5px' }} /> Client</span>
                                <span className="pd-info-value">{project.client}</span>
                            </div>
                        )}
                        {project.category && (
                            <div className="pd-info-item">
                                <span className="pd-info-label"><Tag size={16} style={{ display: 'inline', marginRight: '5px' }} /> Category</span>
                                <span className="pd-info-value">{project.category}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsBackEnd;
