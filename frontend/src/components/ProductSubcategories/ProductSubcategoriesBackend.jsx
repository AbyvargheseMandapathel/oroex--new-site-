import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductSubcategoriesBackend.css';
import { getProductCategories } from '../../api';
import Loader from '../Loader/Loader';
import { ArrowLeft } from 'lucide-react';

const ProductSubcategoriesBackend = () => {
    const { category_slug } = useParams();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Better approach: endpoint to get single category with subcats.
        // Current: Fetch all and find.
        getProductCategories()
            .then(data => {
                const foundCat = data.find(c => c.slug === category_slug);
                setActiveCategory(foundCat);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch categories", err);
                setLoading(false);
            });
    }, [category_slug]);

    if (loading) return <Loader />;

    if (!activeCategory) return (
        <div className="psc-page">
            <button className="psc-back-btn" onClick={() => navigate('/products')}>
                <ArrowLeft size={20} /> Back to Categories
            </button>
            <div className="psc-error">Category not found.</div>
        </div>
    );

    return (
        <div className="psc-page">
            <div className="psc-header">
                <button className="psc-back-btn" onClick={() => navigate('/products')}>
                    <ArrowLeft size={20} /> Back
                </button>
                <h1 className="psc-title">{activeCategory.name}</h1>
                <p className="psc-subtitle">Select a subcategory to view products</p>
            </div>

            <div className="psc-grid">
                {activeCategory.subcategories.map(sub => (
                    <div
                        key={sub.id}
                        className="psc-card"
                        onClick={() => navigate(`/products/${category_slug}/${sub.slug}`)}
                    >
                        <div className="psc-image-wrapper">
                            {sub.image ? (
                                <img src={sub.image} alt={sub.name} className="psc-sub-img" />
                            ) : (
                                <div className="psc-placeholder-img"></div>
                            )}
                        </div>
                        <div className="psc-content">
                            <h3>{sub.name}</h3>
                            <p>{sub.description || "Browse products."}</p>
                        </div>
                    </div>
                ))}

                {activeCategory.subcategories.length === 0 && (
                    <div className="psc-empty">No subcategories found in this category.</div>
                )}
            </div>
        </div>
    );
};

export default ProductSubcategoriesBackend;
