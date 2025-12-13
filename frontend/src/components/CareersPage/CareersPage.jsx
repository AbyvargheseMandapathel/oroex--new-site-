import React from 'react';
import './CareersPage.css';
import careersData from '../../data/careers.json';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';

const CareersPage = () => {
    return (
        <div className="careers-page-wrapper">
            <div className="careers-header">
                <h1 className="careers-title">Join Our Team</h1>
                <p className="careers-subtitle">
                    Discover opportunities to build safety-critical solutions for the world's most demanding environments.
                </p>
            </div>

            <div className="careers-list">
                {careersData.map((job) => (
                    <div key={job.id} className="job-card">
                        <div className="job-content">
                            <h2 className="job-title">{job.title}</h2>
                            <div className="job-meta-row">
                                <div className="job-meta-item">
                                    <MapPin size={16} /> <span>{job.location}</span>
                                </div>
                                <div className="job-meta-item">
                                    <Clock size={16} /> <span>{job.type}</span>
                                </div>
                            </div>
                            <p className="job-description">{job.description}</p>
                            <div className="job-requirements">
                                <h4>Requirements:</h4>
                                <ul>
                                    {job.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="job-action">
                            <a href={`mailto:careers@oroex.com?subject=Application for ${job.title}`} className="apply-btn">
                                Apply Now <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="careers-footer">
                <p>Don't see a role that fits? Send your CV to <a href="mailto:careers@oroex.com">careers@oroex.com</a></p>
            </div>
        </div>
    );
};

export default CareersPage;
