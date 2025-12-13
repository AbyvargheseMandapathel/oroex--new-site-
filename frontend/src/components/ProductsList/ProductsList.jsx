import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../ProductCategories/Products.css'; // Shared CSS
import productsData from '../../data/products.json';
import { ArrowRight } from 'lucide-react';

const ProductsList = () => {
    const navigate = useNavigate();
    const { category, subcategory } = useParams();
    const decodedCategory = decodeURIComponent(category);
    const decodedSubcategory = decodeURIComponent(subcategory);

    const filteredProducts = productsData.filter(
        p => p.category === decodedCategory && p.subcategory === decodedSubcategory
    );

    return (
        <div className="products-page-wrapper">
            <div className="prod-header">
                <div className="prod-breadcrumbs">
                    <Link to="/products">Products</Link> / <Link to={`/products/${category}`}>{decodedCategory}</Link> / <span>{decodedSubcategory}</span>
                </div>
                <h1 className="prod-title">{decodedSubcategory}</h1>
            </div>

            <div className="prod-grid">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="prod-card"
                        style={{ alignItems: 'flex-start', textAlign: 'left', padding: '0' }}
                        onClick={() => navigate(`/products/${category}/${subcategory}/${product.id}`)}
                    >
                        <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderBottom: '1px solid #222' }}>
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div style={{ padding: '1.5rem', width: '100%' }}>
                            <h3 className="prod-card-title" style={{ fontSize: '1.2rem' }}>{product.title}</h3>
                            <button
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                View Details <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
