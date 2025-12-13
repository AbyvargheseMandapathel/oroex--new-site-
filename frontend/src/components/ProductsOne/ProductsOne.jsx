import React from 'react';
import './ProductsOne.css';
import productsData from '../../data/products.json';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const ProductsOne = () => {
    return (
        <section className="products-one-section">
            <div className="p1-header">
                <h2 className="p1-title">Industrial Solutions</h2>
                <p className="p1-subtitle">High-performance equipment for demanding sectors.</p>
            </div>

            <div className="p1-container">
                {productsData.map((product) => (
                    <div key={product.id} className="p1-card">
                        <div className="p1-image-wrapper">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="p1-image"
                            />
                            <div className="p1-category">{product.category}</div>
                        </div>

                        <div className="p1-content">
                            <h3 className="p1-card-title">{product.title}</h3>
                            <p className="p1-desc">{product.description}</p>

                            <div className="p1-footer">
                                <span className="p1-price">{product.price}</span>
                                <button className="p1-btn">
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p1-view-all">
                <button className="p1-view-all-btn">
                    View All Products <ArrowRight size={20} />
                </button>
            </div>
        </section>
    );
};

export default ProductsOne;
