const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001/api';

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

export const getServiceDetails = async (slug) => {
    const response = await fetch(`${BASE_URL}/services/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch service details');
    }
    return response.json();
};


export const getHomepageProducts = async () => {
    const response = await fetch(`${BASE_URL}/products-fifteen-backend/`);
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

export const submitContact = async (data) => {
    const response = await fetch(`${BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to submit contact');
    }
    return response.json();
};

export const getProductDetails = async (slug) => {
    const response = await fetch(`${BASE_URL}/products/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};

export const getProductCategories = async () => {
    const response = await fetch(`${BASE_URL}/products/categories/`);
    if (!response.ok) {
        throw new Error('Failed to fetch product categories');
    }
    return response.json();
};

export const getProjects = async () => {
    const response = await fetch(`${BASE_URL}/projects/`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return response.json();
};

export const getProjectDetails = async (slug) => {
    const response = await fetch(`${BASE_URL}/projects/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch project details');
    }
    return response.json();
};

export const getFaqs = async () => {
    const response = await fetch(`${BASE_URL}/faqs/`);
    if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
    }
    return response.json();
};

export const getCareers = async () => {
    const response = await fetch(`${BASE_URL}/careers/`);
    if (!response.ok) {
        throw new Error('Failed to fetch careers');
    }
    return response.json();
};

export const getCareerDetails = async (slug) => {
    const response = await fetch(`${BASE_URL}/careers/${slug}/`);
    if (!response.ok) {
        throw new Error('Failed to fetch career details');
    }
    return response.json();
};

export const getAbout = async () => {
    const response = await fetch(`${BASE_URL}/about/`);
    if (!response.ok) {
        throw new Error('Failed to fetch about data');
    }
    return response.json();
};

export const getCompanyInfo = async () => {
    const response = await fetch(`${BASE_URL}/company-info/`);
    if (!response.ok) {
        throw new Error('Failed to fetch company info');
    }
    return response.json();
};

export const fetchDownloads = async () => {
    const response = await fetch(`${BASE_URL}/downloads/`);
    if (!response.ok) {
        throw new Error('Failed to fetch downloads');
    }
    return response.json();
};

export const searchGlobal = async (query) => {
    const response = await fetch(`${BASE_URL}/search/?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }
    return response.json();
};
