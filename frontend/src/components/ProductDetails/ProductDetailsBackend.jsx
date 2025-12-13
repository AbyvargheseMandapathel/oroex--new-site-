import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsBackend.css';
import { getProductDetails } from '../../api';
import {
    ArrowLeft,
    CheckCircle,
    Box,
    FileText,
    Share2,
    Play
} from 'lucide-react';

const ProductDetailsBackend = () => {
    const { category_slug, subcategory_slug, slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetails(slug)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch product details", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="pdb-loading">Loading Product Details...</div>;

    if (!product) return (
        <div className="pdb-page">
            <div className="pdb-error">Product not found.</div>
            <button className="pdb-back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );

    return (
        <div className="pdb-page">
            <div className="pdb-nav-header">
                <button className="pdb-back-btn" onClick={() => navigate(`/products/${category_slug}/${subcategory_slug}`)}>
                    <ArrowLeft size={18} /> Back
                </button>
            </div>

            {/* Header Section */}
            <header className="pdb-header">
                <div className="pdb-header-content">
                    {product.badge && <span className="pdb-badge">{product.badge}</span>}
                    <h1 className="pdb-title">{product.title}</h1>
                    <div className="pdb-meta">
                        <span className="pdb-category">{product.category} / {product.subcategory}</span>
                        <span className="pdb-price">{product.price}</span>
                    </div>
                </div>
            </header>

            {/* Media Showcase: Large and Detailed */}
            <section className="pdb-showcase">
                <div className="pdb-media-container">
                    {product.videoUrl ? (
                        <div className="pdb-video-wrapper">
                            <video
                                src={product.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="pdb-media"
                                controls
                            />
                        </div>
                    ) : (
                        <div className="pdb-image-wrapper">
                            <img src={product.image} alt={product.title} className="pdb-media" />
                        </div>
                    )}
                </div>
            </section>

            {/* Details Content */}
            <div className="pdb-container">
                <div className="pdb-main">
                    <h2 className="pdb-section-heading">Product Overview</h2>
                    <div className="pdb-rich-text">
                        {product.longDescription ? (
                            <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                        ) : (
                            <div>
                                <p>{product.description}</p>
                                <p>Detailed specification not available.</p>
                            </div>
                        )}
                    </div>
                </div>

                <aside className="pdb-sidebar">
                    <div className="pdb-card">
                        <div className="pdb-card-header">
                            <Box size={20} className="text-accent" />
                            Key Features
                        </div>
                        <ul className="pdb-specs-list">
                            {product.features && product.features.map((feat, i) => (
                                <li className="pdb-spec-item" key={i}>
                                    <CheckCircle size={16} className="pdb-check" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                            {(!product.features || product.features.length === 0) && (
                                <li className="pdb-spec-item">No specific features listed.</li>
                            )}
                        </ul>
                    </div>

                    <div className="pdb-card action-card">
                        <button className="pdb-action-btn primary" onClick={() => navigate(`/contact?product=${product.slug}`)}>Request Quote</button>
                        {/* <button className="pdb-action-btn secondary">
                            <FileText size={18} /> Download Brochure
                        </button> */}
                    </div>
                </aside>
            </div>

            {/* Related Products Section */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <section className="pdb-related">
                    <h2 className="pdb-related-title">Related Products</h2>
                    <div className="pdb-related-grid">
                        {product.relatedProducts.map(rel => (
                            <div
                                key={rel.id}
                                className="pdb-related-card"
                                onClick={() => navigate(`/products/${category_slug}/${subcategory_slug}/${rel.slug}`)}
                            >
                                <div className="pdb-related-img-box">
                                    {rel.image ? (
                                        <img src={rel.image} alt={rel.title} className="pdb-related-img" />
                                    ) : (
                                        <div className="pdb-related-placeholder"></div>
                                    )}
                                </div>
                                <div className="pdb-related-info">
                                    <h4>{rel.title}</h4>
                                    <span>{rel.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetailsBackend;

