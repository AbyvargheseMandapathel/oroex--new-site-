import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../ProductCategories/Products.css';
import productsData from '../../data/products.json';
import { Grid } from 'lucide-react';

const ProductSubcategories = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const decodedCategory = decodeURIComponent(category);

    // Filter products by category then get unique subcategories
    const categoryProducts = productsData.filter(p => p.category === decodedCategory);
    const subcategories = [...new Set(categoryProducts.map(p => p.subcategory))];

    return (
        <div className="products-page-wrapper">
            <div className="prod-header">
                <div className="prod-breadcrumbs">
                    <Link to="/products">Products</Link> / <span>{decodedCategory}</span>
                </div>
                <h1 className="prod-title">{decodedCategory}</h1>
            </div>

            <div className="prod-grid">
                {subcategories.map((sub, index) => {
                    // Find first product in this subcategory to get an image
                    const representativeProduct = categoryProducts.find(p => p.subcategory === sub);
                    const imageSrc = representativeProduct ? representativeProduct.image : '';
                    const count = categoryProducts.filter(p => p.subcategory === sub).length;

                    return (
                        <div
                            key={index}
                            className="prod-card"
                            onClick={() => navigate(`/products/${category}/${encodeURIComponent(sub)}`)}
                        >
                            <div className="prod-card-image-wrapper">
                                <img
                                    src={imageSrc}
                                    alt={sub}
                                    className="prod-card-image"
                                />
                            </div>
                            <h3 className="prod-card-title">{sub}</h3>
                            <span className="prod-card-count">{count} Products</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductSubcategories;
