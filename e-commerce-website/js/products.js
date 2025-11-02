// Products page functionality

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;
let currentCategory = null;
let currentSearch = null;
let currentSort = 'default';

// Initialize products page
async function initProducts() {
    // Check for category or search parameter
    const urlParams = new URLSearchParams(window.location.search);
    currentCategory = urlParams.get('category');
    currentSearch = urlParams.get('search');
    
    // Fetch products
    allProducts = await api.fetchAllProducts();
    
    // Load filters
    await loadFilters();
    
    // Apply filters and render
    applyFilters();
    renderProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize ScrollTrigger if available
    if (window.gsap && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }
}

// Load filters
async function loadFilters() {
    // Load categories
    const categories = await api.fetchCategories();
    const categoryFilters = document.getElementById('categoryFilters');
    
    if (categoryFilters) {
        categories.forEach(category => {
            const label = document.createElement('label');
            label.className = 'filter-checkbox';
            label.innerHTML = `
                <input type="checkbox" value="${category}" ${currentCategory === category ? 'checked' : ''}>
                <span>${category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}</span>
            `;
            categoryFilters.appendChild(label);
        });
    }
    
    // Setup price range
    const priceRange = document.getElementById('priceRange');
    const maxPrice = document.getElementById('maxPrice');
    
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            if (maxPrice) {
                maxPrice.textContent = `$${e.target.value}`;
            }
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    document.querySelectorAll('#categoryFilters input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', utils.debounce(applyFilters, 300));
    }
    
    // Rating filters
    document.querySelectorAll('#ratingFilters input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
}

// Apply filters
function applyFilters() {
    filteredProducts = [...allProducts];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('#categoryFilters input:checked'))
        .map(input => input.value);
    
    if (!selectedCategories.includes('all')) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    // If URL has category parameter, filter by it
    if (currentCategory) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentCategory
        );
    }
    
    // Search filter
    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            product.description.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    // Price filter
    const maxPrice = parseFloat(document.getElementById('priceRange')?.value) || 1000;
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Rating filter
    const selectedRatings = Array.from(document.querySelectorAll('#ratingFilters input:checked'))
        .map(input => input.value);
    
    if (!selectedRatings.includes('all')) {
        const minRatings = selectedRatings.map(r => parseFloat(r));
        filteredProducts = filteredProducts.filter(product => {
            const rate = parseFloat(product.rating.rate);
            return minRatings.some(min => rate >= min);
        });
    }
    
    // Sort
    applySort();
    
    // Reset to first page
    currentPage = 1;
    
    // Update products count
    const productsCount = document.getElementById('productsCount');
    if (productsCount) {
        productsCount.textContent = `${filteredProducts.length} Products`;
    }
}

// Apply sort
function applySort() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // Keep original order
            break;
    }
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');
    
    if (!productsGrid) return;
    
    // Handle empty state
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear All Filters</button>
            </div>
        `;
        if (pagination) pagination.innerHTML = '';
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Render products
    productsGrid.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
    
    // Animate products
    if (window.gsap) {
        const cards = productsGrid.querySelectorAll('.card');
        gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
        });
    }
    
    // Render pagination
    if (pagination) {
        renderPagination(totalPages);
    }
}

// Create product card
function createProductCard(product) {
    const stars = generateStars(product.rating.rate);
    
    return `
        <div class="card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.title}" class="card-image">
            <div class="card-body">
                <h3 class="card-title">${product.title}</h3>
                <p class="card-text">${product.description}</p>
                <div class="card-price">${utils.formatPrice(product.price)}</div>
                <div class="card-rating">
                    <span class="rating-stars">${stars}</span>
                    <span class="rating-count">(${product.rating.count})</span>
                </div>
                <button class="btn btn-primary" onclick="event.stopPropagation(); cartAPI.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '<i class="fas fa-star"></i>'.repeat(fullStars);
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    stars += '<i class="far fa-star"></i>'.repeat(emptyStars);
    
    return stars;
}

// Render pagination
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination || totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;
    
    // Show page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    paginationHTML += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Go to page
function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts();
        utils.scrollToTop();
    }
}

// Clear filters
function clearFilters() {
    document.querySelectorAll('#categoryFilters input').forEach(input => {
        input.checked = input.value === 'all';
    });
    document.querySelectorAll('#ratingFilters input').forEach(input => {
        input.checked = input.value === 'all';
    });
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 1000;
        const maxPrice = document.getElementById('maxPrice');
        if (maxPrice) maxPrice.textContent = '$1000';
    }
    applyFilters();
    renderProducts();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initProducts);

