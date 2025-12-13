import React from 'react';
import './DownloadsPage.css';
import downloadsData from '../../data/downloads.json';
import { FileText, Download, FileCode, CheckCircle } from 'lucide-react';

const DownloadsPage = () => {
    const getIcon = (type) => {
        switch (type) {
            case 'Certificate': return <CheckCircle size={32} />;
            case 'Profile': return <FileCode size={32} />;
            default: return <FileText size={32} />;
        }
    };

    return (
        <div className="downloads-page-wrapper">
            <div className="downloads-header">
                <h1 className="downloads-title">Downloads</h1>
                <p className="downloads-subtitle">Access our certifications, brochures, and company profiles.</p>
            </div>

            <div className="downloads-grid">
                {downloadsData.map((item, index) => (
                    <div key={index} className="download-card">
                        <div className="download-thumbnail-wrapper">
                            <img src={item.image} alt={item.title} className="download-thumbnail" />
                        </div>

                        <div className="download-content">
                            <div className="download-header-row">
                                <div className="download-icon-wrapper">
                                    {getIcon(item.type)}
                                </div>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="download-btn"
                                >
                                    <Download size={20} />
                                </a>
                            </div>

                            <h3 className="download-title">{item.title}</h3>
                            <div className="download-meta">
                                <span className="download-type">{item.type}</span>
                                <span className="download-separator">•</span>
                                <span className="download-size">{item.size}</span>
                            </div>
                            <p className="download-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DownloadsPage;
