const BASE_URL = 'http://127.0.0.1:8001/api';

export const getNavbars = async () => {
    const response = await fetch(`${BASE_URL}/navbars/`);
    if (!response.ok) {
        throw new Error('Failed to fetch navbars');
    }
    return response.json();
};

export const getHeaderVideos = async () => {
    const response = await fetch(`${BASE_URL}/header-videos/`);
    if (!response.ok) {
        throw new Error('Failed to fetch header videos');
    }
    return response.json();
    return response.json();
};

export const getServices = async () => {
    const response = await fetch(`${BASE_URL}/services/`);
    if (!response.ok) {
        throw new Error('Failed to fetch services');
    }
    return response.json();
};

export const getHomepageServices = async () => {
    const response = await fetch(`${BASE_URL}/homepage-services/`);
    if (!response.ok) {
        throw new Error('Failed to fetch homepage services');
    }
    return response.json();
};

export const getServiceDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/services/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch service details');
    }
    return response.json();
};


export const getHomepageProducts = async () => {
    const response = await fetch(`${BASE_URL}/products/homepage/`);
    if (!response.ok) {
        throw new Error('Failed to fetch homepage products');
    }
    return response.json();
};

export const getProducts = async () => {
    const response = await fetch(`${BASE_URL}/products/`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const getFilteredProducts = async (categoryId = null, subcategoryId = null) => {
    let url = `${BASE_URL}/products/`;
    if (subcategoryId) {
        url += `?subcategory=${subcategoryId}`;
    } else if (categoryId) {
        url += `?category=${categoryId}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch filtered products');
    }
    return response.json();
};

export const getProductDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};

export const getProductCategories = async () => {
    const response = await fetch(`${BASE_URL}/product-categories/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product categories');
    }
    return response.json();
};
