// Homepage functionality

let allProducts = [];

// Initialize homepage
async function initHomepage() {
    // Fetch products
    allProducts = await api.fetchAllProducts();
    
    // Load categories
    await loadCategories();
    
    // Load featured products
    loadFeaturedProducts();
    
    // Setup search functionality
    setupSearch();
}

// Load categories
async function loadCategories() {
    const categories = await api.fetchCategories();
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    if (!categoriesGrid) return;
    
    const categoryData = categories.map(cat => ({
        name: cat,
        displayName: cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' '),
        icon: getCategoryIcon(cat)
    }));
    
    categoriesGrid.innerHTML = categoryData.map(category => `
        <div class="category-card" onclick="window.location.href='products.html?category=${category.name}'">
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <div class="category-name">${category.displayName}</div>
        </div>
    `).join('');
    
    // Animate categories
    if (window.gsap) {
        const cards = categoriesGrid.querySelectorAll('.category-card');
        gsap.from(cards, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: categoriesGrid,
                start: 'top 80%'
            }
        });
    }
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        "electronics": "fas fa-laptop",
        "jewelery": "fas fa-gem",
        "men's clothing": "fas fa-tshirt",
        "women's clothing": "fas fa-tshirt"
    };
    return icons[category] || "fas fa-tag";
}

// Load featured products
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProducts');
    
    if (!featuredGrid) return;
    
    // Get first 6 products as featured
    const featured = allProducts.slice(0, 6);
    
    featuredGrid.innerHTML = featured.map(product => createProductCard(product)).join('');
    
    // Animate products
    if (window.gsap) {
        const cards = featuredGrid.querySelectorAll('.card');
        gsap.from(cards, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: featuredGrid,
                start: 'top 80%'
            }
        });
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

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '<i class="fas fa-star"></i>'.repeat(fullStars);
    if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    stars += '<i class="far fa-star"></i>'.repeat(emptyStars);
    
    return stars;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

// Initialize ScrollTrigger for animations
if (window.gsap && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initHomepage);

