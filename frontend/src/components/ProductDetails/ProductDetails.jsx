import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../ProductCategories/Products.css';
import productsData from '../../data/products.json';
import { ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
    const { category, subcategory, id } = useParams();
    const navigate = useNavigate();
    const decodedCategory = decodeURIComponent(category);
    const decodedSubcategory = decodeURIComponent(subcategory);
    const product = productsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return <div>Product not found</div>;

    return (
        <div className="products-page-wrapper">
            <div className="prod-header" style={{ textAlign: 'left' }}>
                <div className="prod-breadcrumbs">
                    <Link to="/products">Products</Link> / <Link to={`/products/${category}`}>{decodedCategory}</Link> / <Link to={`/products/${category}/${subcategory}`}>{decodedSubcategory}</Link> / <span>{product.title}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                <div style={{ border: '1px solid #333', borderRadius: '12px', overflow: 'hidden' }}>
                    {product.videoUrl && !product.videoUrl.includes('products/') ? ( // Simple check if it's external url or local
                        <video controls src={product.videoUrl} style={{ width: '100%' }} poster={product.image} />
                    ) : (
                        <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                    )}
                </div>

                <div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1.5rem' }}>{product.title}</h1>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: '#222',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        marginBottom: '2rem'
                    }}>
                        {product.category} / {product.subcategory}
                    </div>

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#eee' }}>Description</h3>
                    <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    <button className="contact-btn" style={{
                        marginTop: '1rem',
                        display: 'inline-block',
                        padding: '1rem 2rem'
                    }}>
                        REQUEST QUOTE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
