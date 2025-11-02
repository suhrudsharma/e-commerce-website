// API Functions for FakeStore API

const API_BASE = 'https://fakestoreapi.com';

// Fetch all products
async function fetchAllProducts() {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        utils.hideLoader();
        return products;
    } catch (error) {
        utils.hideLoader();
        console.error('Error fetching products:', error);
        utils.showNotification('Failed to load products. Please try again.', 'error');
        return [];
    }
}

// Fetch single product
async function fetchProduct(id) {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products/${id}`);
        const product = await response.json();
        utils.hideLoader();
        return product;
    } catch (error) {
        utils.hideLoader();
        console.error('Error fetching product:', error);
        utils.showNotification('Failed to load product. Please try again.', 'error');
        return null;
    }
}

// Fetch products by category
async function fetchProductsByCategory(category) {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products/category/${category}`);
        const products = await response.json();
        utils.hideLoader();
        return products;
    } catch (error) {
        utils.hideLoader();
        console.error('Error fetching category products:', error);
        utils.showNotification('Failed to load products. Please try again.', 'error');
        return [];
    }
}

// Fetch all categories
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/products/categories`);
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Post new product to API (for admin panel)
async function postProduct(productData) {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const result = await response.json();
        utils.hideLoader();
        return result;
    } catch (error) {
        utils.hideLoader();
        console.error('Error posting product:', error);
        utils.showNotification('Failed to add product. Please try again.', 'error');
        return null;
    }
}

// Update product
async function updateProduct(id, productData) {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const result = await response.json();
        utils.hideLoader();
        return result;
    } catch (error) {
        utils.hideLoader();
        console.error('Error updating product:', error);
        utils.showNotification('Failed to update product. Please try again.', 'error');
        return null;
    }
}

// Delete product
async function deleteProduct(id) {
    try {
        utils.showLoader();
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        utils.hideLoader();
        return result;
    } catch (error) {
        utils.hideLoader();
        console.error('Error deleting product:', error);
        utils.showNotification('Failed to delete product. Please try again.', 'error');
        return null;
    }
}

// Export functions
window.api = {
    fetchAllProducts,
    fetchProduct,
    fetchProductsByCategory,
    fetchCategories,
    postProduct,
    updateProduct,
    deleteProduct
};

