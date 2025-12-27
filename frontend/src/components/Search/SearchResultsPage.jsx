import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchGlobal } from '../../api';
import './SearchResultsPage.css';
import { Search, ArrowRight, Package, Wrench, Briefcase, Loader2 } from 'lucide-react';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState({ products: [], services: [], projects: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        if (query) {
            setLoading(true);
            searchGlobal(query)
                .then(data => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Search failed", err);
                    setLoading(false);
                });
        }
    }, [query]);

    const ResultCard = ({ item, type, link }) => (
        <Link to={link} className="search-result-card">
            <div className="result-image-wrapper">
                {item.image || item.videoUrl ? (
                    <img src={item.image || item.videoUrl} alt={item.title} className="result-image" />
                ) : (
                    <div className="result-placeholder">
                        <Search size={24} className="opacity-20" />
                    </div>
                )}
            </div>
            <div className="result-content">
                <span className={`result-badge badge-${type}`}>{type}</span>
                <h3 className="result-title">{item.title}</h3>
                <p className="result-description">
                    {item.shortDescription || item.description?.substring(0, 100) + '...'}
                </p>
                <span className="result-link-text">
                    View Details <ArrowRight size={14} />
                </span>
            </div>
        </Link>
    );

    const hasResults = results.products.length > 0 || results.services.length > 0 || results.projects.length > 0;

    return (
        <div className="search-page-container">
            <div className="search-header">
                <div className="container">
                    <h1 className="search-title">Search Results</h1>
                    <p className="search-subtitle">Showing results for "<span className="highlight-text">{query}</span>"</p>
                </div>
            </div>

            <div className="container search-content">
                {loading ? (
                    <div className="loading-state">
                        <Loader2 className="animate-spin" size={40} />
                        <p>Searching...</p>
                    </div>
                ) : !hasResults ? (
                    <div className="no-results">
                        <Search size={60} strokeWidth={1} />
                        <h2>No results found</h2>
                        <p>We couldn't find anything matching "{query}". Try different keywords.</p>
                    </div>
                ) : (
                    <>
                        <div className="search-tabs">
                            <button
                                className={`search-tab ${activeTab === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveTab('all')}
                            >
                                All Results
                            </button>
                            {results.products.length > 0 && (
                                <button
                                    className={`search-tab ${activeTab === 'products' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('products')}
                                >
                                    Products ({results.products.length})
                                </button>
                            )}
                            {results.services.length > 0 && (
                                <button
                                    className={`search-tab ${activeTab === 'services' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('services')}
                                >
                                    Services ({results.services.length})
                                </button>
                            )}
                            {results.projects.length > 0 && (
                                <button
                                    className={`search-tab ${activeTab === 'projects' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('projects')}
                                >
                                    Projects ({results.projects.length})
                                </button>
                            )}
                        </div>

                        <div className="search-results-grid">
                            {(activeTab === 'all' || activeTab === 'products') && results.products.length > 0 && (
                                <div className="results-section">
                                    {activeTab === 'all' && <h2 className="section-title"><Package size={20} /> Products</h2>}
                                    <div className="results-list">
                                        {results.products.map(item => (
                                            <ResultCard
                                                key={item.id}
                                                item={item}
                                                type="product"
                                                // Assuming simple link structure, might need adjustment based on full app routing
                                                link={`/products/${item.category}/${item.subcategory}/${item.slug}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(activeTab === 'all' || activeTab === 'services') && results.services.length > 0 && (
                                <div className="results-section">
                                    {activeTab === 'all' && <h2 className="section-title"><Wrench size={20} /> Services</h2>}
                                    <div className="results-list">
                                        {results.services.map(item => (
                                            <ResultCard
                                                key={item.id}
                                                item={item}
                                                type="service"
                                                link={`/services/${item.slug}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(activeTab === 'all' || activeTab === 'projects') && results.projects.length > 0 && (
                                <div className="results-section">
                                    {activeTab === 'all' && <h2 className="section-title"><Briefcase size={20} /> Projects</h2>}
                                    <div className="results-list">
                                        {results.projects.map(item => (
                                            <ResultCard
                                                key={item.id}
                                                item={item}
                                                type="project"
                                                link={`/projects/${item.slug}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
