import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsBackendOne.css';
import { getProductDetails } from '../../api';
import {
    ArrowLeft,
    CheckCircle,
    Box,
    FileText
} from 'lucide-react';

const ProductDetailsBackendOne = () => {
    const { category, subcategory, id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetails(id)
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch product details", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="pdb1-loading">Loading Product Details...</div>;

    if (!product) return (
        <div className="pdb1-page">
            <div className="pdb1-error">Product not found.</div>
            <button className="pdb1-back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );

    return (
        <div className="pdb1-page">
            <button className="pdb1-back-btn" onClick={() => navigate(`/products/${category}/${subcategory}`)}>
                <ArrowLeft size={18} /> Back to List
            </button>

            {/* Hero / Media Section (Previous Design: Background) */}
            <section className="pdb1-hero">
                {product.videoUrl ? (
                    <video
                        src={product.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="pdb1-video-bg"
                    />
                ) : (
                    <div className="pdb1-hero-image" style={{ backgroundImage: `url(${product.image})` }}></div>
                )}
                <div className="pdb1-hero-overlay"></div>

                <div className="pdb1-hero-content">
                    {product.badge && <span className="pdb1-badge">{product.badge}</span>}
                    <h1 className="pdb1-title">{product.title}</h1>
                    <p className="pdb1-price-hero">{product.price}</p>
                </div>
            </section>

            {/* Content Layout */}
            <div className="pdb1-container">
                <div className="pdb1-main">
                    <div className="pdb1-rich-text">
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

                <aside className="pdb1-sidebar">
                    <div className="pdb1-card">
                        <div className="pdb1-card-header">
                            <Box size={20} className="text-accent" />
                            Product Specifications
                        </div>
                        <ul className="pdb1-specs-list">
                            {product.features && product.features.map((feat, i) => (
                                <li className="pdb1-spec-item" key={i}>
                                    <CheckCircle size={16} className="pdb1-check" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                            {(!product.features || product.features.length === 0) && (
                                <li className="pdb1-spec-item">No specific features listed.</li>
                            )}
                        </ul>
                    </div>

                    <div className="pdb1-card">
                        <button className="pdb1-action-btn primary" onClick={() => navigate('/contact')}>Request Quote</button>
                        {/* <button className="pdb1-action-btn secondary">
                            <FileText size={18} /> Download Brochure
                        </button> */}
                    </div>
                </aside>
            </div>

            {/* Related Products Section (Using pdb1- styling) */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <section className="pdb1-related">
                    <div className="pdb1-container">
                        <h2 className="pdb1-related-title">Related Products</h2>
                        <div className="pdb1-related-grid">
                            {product.relatedProducts.map(rel => (
                                <div
                                    key={rel.id}
                                    className="pdb1-related-card"
                                    onClick={() => navigate(`/products/${category}/${subcategory}/${rel.id}`)}
                                >
                                    <div className="pdb1-related-img-box">
                                        {rel.image ? (
                                            <img src={rel.image} alt={rel.title} className="pdb1-related-img" />
                                        ) : (
                                            <div className="pdb1-related-placeholder"></div>
                                        )}
                                    </div>
                                    <div className="pdb1-related-info">
                                        <h4>{rel.title}</h4>
                                        <span>{rel.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetailsBackendOne;
