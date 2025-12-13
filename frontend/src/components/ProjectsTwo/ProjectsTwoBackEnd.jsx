import React, { useState, useEffect } from 'react';
import './ProjectsTwo.css'; // Reusing CSS
import { getProjects } from '../../api';
import Loader from '../Loader/Loader';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectsTwoBackEnd = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProjects()
            .then(data => {
                setProjects(data);
                if (data.length > 0) {
                    setActiveProject(data[0]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        if (!projects.length || !activeProject) return;
        const currentIndex = projects.findIndex(p => p.id === activeProject.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setActiveProject(projects[nextIndex]);
    };

    const handlePrev = () => {
        if (!projects.length || !activeProject) return;
        const currentIndex = projects.findIndex(p => p.id === activeProject.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        setActiveProject(projects[prevIndex]);
    };

    // Touch state for swipe definition
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="p2-error">Error: {error}</div>;
    if (projects.length === 0) return <div className="p2-empty">No projects found.</div>;

    if (!activeProject) return null;

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
                    <div
                        className="p2-display-area"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="p2-image-card">
                            <img
                                src={activeProject.image}
                                alt={activeProject.title}
                                className="p2-image"
                            />
                            <div className="p2-image-overlay">
                                <div className="p2-overlay-content">
                                    <span className="p2-overlay-id">0{activeProject.order || activeProject.id}</span>
                                    <h3>{activeProject.title}</h3>
                                </div>
                            </div>
                        </div>

                        <div className="p2-details-panel">
                            <div className="p2-details-text-action">
                                <p className="p2-desc">{activeProject.description}</p>
                                <button
                                    className="p2-link-btn"
                                    onClick={() => navigate(`/projects/${activeProject.slug}`)}
                                >
                                    VIEW CASE STUDY <ArrowUpRight size={18} />
                                </button>
                            </div>

                            {/* Mobile Navigation Controls */}
                            <div className="p2-mobile-nav">
                                <div className="p2-nav-dots">
                                    {projects.map((p) => (
                                        <div
                                            key={p.id}
                                            className={`p2-nav-dot ${p.id === activeProject.id ? 'active' : ''}`}
                                            onClick={() => setActiveProject(p)}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="p2-view-all-btn-mobile"
                                onClick={() => navigate('/projects')}
                            >
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
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`p2-list-item ${activeProject.id === project.id ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveProject(project)}
                                    onClick={() => setActiveProject(project)}
                                >
                                    <span className="p2-item-num">0{project.order || project.id}</span>
                                    <span className="p2-item-title">{project.title}</span>
                                    <ArrowRight size={16} className="p2-item-arrow" />
                                </div>
                            ))}
                        </div>
                        {/* 
                        <div className="p2-view-all-wrapper">
                            <button
                                className="p2-view-all-btn"
                                onClick={() => navigate('/projects')}
                            >
                                VIEW ALL PROJECTS
                            </button>
                        </div>
                         */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsTwoBackEnd;
