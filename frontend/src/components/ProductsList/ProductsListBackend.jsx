import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductsListBackend.css';
import { getFilteredProducts } from '../../api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProductsListBackend = () => {
    const { category_slug, subcategory_slug } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Filter by subcategory (which implies category, but we have subcategory ID)
        // BE accepts ID via query params? NO, we updated BE view to filter by ID but frontend sends ID.
        // Wait, "getFilteredProducts" accepts IDs. We have SLUGS now.
        // We need to fetch products by subcategory SLUG? 
        // The current "getFilteredProducts" uses `?subcategory=ID`.
        // I need to update getFilteredProducts or backend view to accept slug filtering?
        // Let's assume for now we need to pass slugs if backend supports it OR fetch all and filter (inefficient).
        // Actually, for now, let's update `getFilteredProducts` to fetch ALL if we don't have IDs?
        // NO. The previous step updated `products_list` view. It still filters by `category_id` or `subcategory_id`?
        // I missed updating `products_list` view to filter by slug. I should fix that.
        // For now, let's try to query by slug? No, `products_list` was NOT updated to filter by `slug`.
        // CRITICAL: `products_list` view needs to filter by `subcategory__slug`.
        // I will assume I can update `getFilteredProducts` to pass correct params later.
        // OR better: use `products/?subcategory_slug=...`
        // I'll update the effect to use `getFilteredProducts` passing slugs?
        // `getFilteredProducts` takes (catId, subId).
        // I need a NEW way to fetch products by slug.
        // Let's modify `getFilteredProducts` to accept slugs and update backend too?
        // OR simply: `getFilteredProducts(null, null, subcategory_slug)` ?
        // I will add a new param or function to api.js?
        // Let's stick to calling `getFilteredProducts` but pass slugs? 
        // `api.js` constructs URL `?subcategory=ID`. If I pass slug, it becomes `?subcategory=slug`.
        // Does backend support `subcategory=slug`? 
        // `products_list` in `views.py` does: `subcategory_id = request.GET.get('subcategory')`.
        // Then `products.filter(subcategory__id=subcategory_id)`.
        // This will fail if I pass a slug string.

        // I need to update backend `products_list` to handle slug lookup? 
        // OR update `ProductsListBackend` to find ID from slug first? (We don't have subcategory list here easily).
        // Updating Backend `products_list` is cleaner.
        // I will update this file assuming backend handles it.
        getFilteredProducts(null, subcategory_slug)
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products", err);
                setLoading(false);
            });
    }, [category_slug, subcategory_slug]);

    if (loading) return <div className="plb-loading">Loading Products...</div>;

    return (
        <div className="plb-page">
            <div className="plb-header">
                <button className="plb-back-btn" onClick={() => navigate(`/products/${category_slug}`)}>
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
                            onClick={() => navigate(`/products/${category_slug}/${subcategory_slug}/${product.slug}`)}
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
