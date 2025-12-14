import React, { useState, useEffect } from 'react';
import './CareersPage.css';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import Loader from '../Loader/Loader';
import { getCareers } from '../../api';
import { Link } from 'react-router-dom';

const CareersPageBackend = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const data = await getCareers();
                setCareers(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching careers:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    if (loading) return <Loader text="Loading opportunities..." />;
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

    return (
        <div className="careers-page-wrapper">
            <div className="careers-header">
                <h1 className="careers-title">Join Our Team</h1>
                <p className="careers-subtitle">
                    Discover opportunities to build safety-critical solutions for the world's most demanding environments.
                </p>
            </div>

            <div className="careers-list">
                {careers.map((job) => (
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
                            <p className="job-description" dangerouslySetInnerHTML={{ __html: job.description.substring(0, 150) + "..." }}></p>
                        </div>
                        <div className="job-action">
                            <Link to={`/careers/${job.slug}`} className="apply-btn">
                                View Details <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}

                {careers.length === 0 && (
                    <div className="text-center py-10">
                        <p>No current openings. Please check back later.</p>
                    </div>
                )}
            </div>

            <div className="careers-footer">
                <p>Don't see a role that fits? Send your CV to <a href="mailto:careers@oroex.com">careers@oroex.com</a></p>
            </div>
        </div>
    );
};

export default CareersPageBackend;
