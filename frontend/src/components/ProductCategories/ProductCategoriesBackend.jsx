import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCategoriesBackend.css';
import { getProductCategories } from '../../api';

const ProductCategoriesBackend = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProductCategories()
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch product categories", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="pcb-loading">Loading Categories...</div>;

    return (
        <div className="pcb-page">
            <h1 className="pcb-title">Product Categories</h1>
            <p className="pcb-subtitle">Explore our wide range of industrial solutions</p>

            <div className="pcb-grid">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="pcb-card"
                        onClick={() => navigate(`/products/${cat.slug}`)}
                    >
                        <div className="pcb-image-wrapper">
                            {cat.image ? (
                                <img src={cat.image} alt={cat.name} className="pcb-cat-img" />
                            ) : (
                                <div className="pcb-placeholder-img"></div>
                            )}
                            <div className="pcb-overlay">
                                <span>View Category</span>
                            </div>
                        </div>
                        <div className="pcb-content">
                            <h3>{cat.name}</h3>
                            <p>{cat.description || "Explore products in this category."}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategoriesBackend;
