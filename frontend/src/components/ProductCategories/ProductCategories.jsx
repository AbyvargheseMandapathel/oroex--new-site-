import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import productsData from '../../data/products.json';
import { Box, Layers, Zap } from 'lucide-react';

const ProductCategories = () => {
    const navigate = useNavigate();

    // specific icons for categories if needed, else default
    const getIcon = (cat) => {
        if (cat.includes('Explosion')) return <Zap size={24} />;
        if (cat.includes('Control')) return <Layers size={24} />;
        return <Box size={24} />;
    };

    // Extract unique categories
    const categories = [...new Set(productsData.map(p => p.category))];

    return (
        <div className="products-page-wrapper">
            <div className="prod-header">
                <h1 className="prod-title">Product Categories</h1>
                <p style={{ color: '#888' }}>Select a category to explore our range</p>
            </div>

            <div className="prod-grid">
                {categories.map((cat, index) => {
                    // Find first product in this category to get an image
                    const representativeProduct = productsData.find(p => p.category === cat);
                    const imageSrc = representativeProduct ? representativeProduct.image : '';
                    const count = productsData.filter(p => p.category === cat).length;

                    return (
                        <div
                            key={index}
                            className="prod-card"
                            onClick={() => navigate(`/products/${encodeURIComponent(cat)}`)}
                        >
                            <div className="prod-card-image-wrapper">
                                <img
                                    src={imageSrc}
                                    alt={cat}
                                    className="prod-card-image"
                                />
                            </div>
                            <h3 className="prod-card-title">{cat}</h3>
                            <span className="prod-card-count">{count} Products</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductCategories;
