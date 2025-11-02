// Admin panel functionality

let isAdminLoggedIn = false;
let allProducts = [];

// Initialize admin panel
async function initAdmin() {
    // Check if admin is logged in
    const savedLoginState = localStorage.getItem('adminLoggedIn');
    isAdminLoggedIn = savedLoginState === 'true';
    
    if (isAdminLoggedIn) {
        showDashboard();
    } else {
        showLogin();
    }
    
    // Fetch products
    allProducts = await api.fetchAllProducts();
    
    // Setup login button
    const loginBtn = document.getElementById('googleLoginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Setup tabs
    setupTabs();
    
    // Setup form submission
    setupFormSubmission();
    
    // Load admin products table
    if (isAdminLoggedIn) {
        loadAdminProductsTable();
    }
}

// Show login
function showLogin() {
    const loginDiv = document.getElementById('adminLogin');
    const dashboardDiv = document.getElementById('adminDashboard');
    
    if (loginDiv) loginDiv.style.display = 'block';
    if (dashboardDiv) dashboardDiv.style.display = 'none';
}

// Show dashboard
function showDashboard() {
    const loginDiv = document.getElementById('adminLogin');
    const dashboardDiv = document.getElementById('adminDashboard');
    
    if (loginDiv) loginDiv.style.display = 'none';
    if (dashboardDiv) dashboardDiv.style.display = 'block';
    
    updateStats();
    loadAdminProductsTable();
}

// Handle login
function handleLogin() {
    // Simulate Google OAuth login
    // In a real application, this would integrate with Google OAuth
    isAdminLoggedIn = true;
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
    utils.showNotification('Logged in successfully!', 'success');
}

// Handle logout
function handleLogout() {
    isAdminLoggedIn = false;
    localStorage.setItem('adminLoggedIn', 'false');
    showLogin();
    utils.showNotification('Logged out successfully', 'success');
}

// Setup tabs
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('addProductForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleAddProduct();
        });
    }
}

// Handle add product
async function handleAddProduct() {
    const title = document.getElementById('productTitle').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const rating = parseFloat(document.getElementById('productRating').value);
    const reviewCount = parseInt(document.getElementById('productReviewCount').value);
    
    const productData = {
        title,
        price,
        description,
        category,
        image,
        rating: {
            rate: rating,
            count: reviewCount
        }
    };
    
    // In a real application, this would post to the API
    // For demo, we'll just show a success message
    utils.showNotification('Product added successfully!', 'success');
    
    // Reset form
    document.getElementById('addProductForm').reset();
    
    // Refresh products list
    allProducts = await api.fetchAllProducts();
    loadAdminProductsTable();
    updateStats();
}

// Load admin products table
function loadAdminProductsTable() {
    const tableBody = document.getElementById('adminProductsTable');
    
    if (!tableBody) return;
    
    if (allProducts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No products found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = allProducts.map(product => `
        <tr class="admin-product-row">
            <td>${product.id}</td>
            <td style="display: flex; align-items: center; gap: 10px;">
                <img src="${product.image}" alt="${product.title}" class="admin-product-image">
                <span>${product.title.substring(0, 50)}${product.title.length > 50 ? '...' : ''}</span>
            </td>
            <td>${product.category}</td>
            <td>${utils.formatPrice(product.price)}</td>
            <td>${product.rating.rate} ⭐</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="handleDeleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

// Handle delete product
async function handleDeleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    // In a real application, this would delete from the API
    utils.showNotification('Product deleted successfully!', 'success');
    
    // Refresh products list
    allProducts = await api.fetchAllProducts();
    loadAdminProductsTable();
    updateStats();
}

// Update stats
function updateStats() {
    const totalProducts = document.getElementById('totalProducts');
    const totalOrders = document.getElementById('totalOrders');
    const totalUsers = document.getElementById('totalUsers');
    
    if (totalProducts) totalProducts.textContent = allProducts.length;
    if (totalOrders) totalOrders.textContent = '0'; // Would be fetched from API
    if (totalUsers) totalUsers.textContent = '0'; // Would be fetched from API
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initAdmin);

