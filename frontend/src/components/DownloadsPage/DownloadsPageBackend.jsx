import React, { useState, useEffect, useMemo } from 'react';
import './DownloadsPage.css';
import { FileText, Download, FileCode, CheckCircle, BookOpen, Shield } from 'lucide-react';
import Loader from '../Loader/Loader';

const DownloadsPageBackend = () => {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8001/api/downloads/');
                if (!response.ok) {
                    throw new Error('Failed to fetch downloads');
                }
                const data = await response.json();
                setDownloads(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching downloads:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDownloads();
    }, []);

    // Extract unique types from data for tabs
    const tabs = useMemo(() => {
        if (!downloads.length) return ['All'];
        const types = [...new Set(downloads.map(item => item.type))];
        return ['All', ...types];
    }, [downloads]);

    const filteredDownloads = useMemo(() => {
        if (activeTab === 'All') return downloads;
        return downloads.filter(item => item.type === activeTab);
    }, [activeTab, downloads]);

    const getIcon = (type) => {
        switch (type) {
            case 'Certificate': return <CheckCircle size={32} />;
            case 'Profile': return <FileCode size={32} />;
            case 'Brochure': return <BookOpen size={32} />;
            case 'Policy': return <Shield size={32} />;
            default: return <FileText size={32} />;
        }
    };

    if (loading) return <Loader text="Loading Downloads..." />;
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

    return (
        <div className="downloads-page-wrapper">
            <div className="downloads-header">
                <h1 className="downloads-title">Downloads</h1>
                <p className="downloads-subtitle">Access our certifications, brochures, and company profiles.</p>
            </div>

            <div className="downloads-tabs-container">
                <div className="downloads-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`downloads-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="downloads-grid">
                {filteredDownloads.map((item) => (
                    <div key={item.id} className="download-card">
                        <div className="download-thumbnail-wrapper">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="download-thumbnail" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <FileText size={48} className="text-gray-600" />
                                </div>
                            )}
                        </div>

                        <div className="download-content">
                            <div className="download-header-row">
                                <div className="download-icon-wrapper">
                                    {getIcon(item.type)}
                                </div>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="download-btn"
                                    >
                                        <Download size={20} />
                                    </a>
                                )}
                            </div>

                            <h3 className="download-title">{item.title}</h3>
                            <div className="download-meta">
                                <span className="download-type">{item.type}</span>
                                {item.size && (
                                    <>
                                        <span className="download-separator">•</span>
                                        <span className="download-size">{item.size}</span>
                                    </>
                                )}
                            </div>
                            <p className="download-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDownloads.length === 0 && (
                <div className="no-downloads-message">
                    <p>No downloads available.</p>
                </div>
            )}
        </div>
    );
};

export default DownloadsPageBackend;
