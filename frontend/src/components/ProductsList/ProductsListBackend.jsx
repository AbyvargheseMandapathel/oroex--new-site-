import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductsListBackend.css';
import { getFilteredProducts } from '../../api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProductsListBackend = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Filter by subcategory (which implies category, but we have subcategory ID)
        getFilteredProducts(null, subcategory)
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, [category, subcategory]);

    if (loading) return <div className="plb-loading">Loading Products...</div>;

    return (
        <div className="plb-page">
            <div className="plb-header">
                <button className="plb-back-btn" onClick={() => navigate(`/products/${category}`)}>
                    <ArrowLeft size={20} /> Back to Subcategories
                </button>
                <div className="plb-header-text">
                    <h1 className="plb-title">Products</h1>
                    {products.length > 0 && <span className="plb-count">{products.length} Items</span>}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="plb-empty">No products found in this category.</div>
            ) : (
                <div className="plb-grid">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="plb-card"
                            onClick={() => navigate(`/products/${category}/${subcategory}/${product.id}`)}
                        >
                            <div className="plb-image-container">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="plb-img" />
                                ) : (
                                    <div className="plb-placeholder"></div>
                                )}
                                <div className="plb-overlay">View Details</div>
                            </div>
                            <div className="plb-info">
                                <h3 className="plb-prod-title">{product.title}</h3>
                                <div className="plb-prod-features">
                                    {product.features && product.features.slice(0, 2).map((f, i) => (
                                        <span key={i} className="plb-feat-tag">{f}</span>
                                    ))}
                                </div>
                                <div className="plb-bottom">
                                    <span className="plb-price">{product.price}</span>
                                    <button className="plb-arrow-btn"><ArrowRight size={18} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsListBackend;
