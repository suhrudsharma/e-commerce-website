// Product detail page functionality

let currentProduct = null;
let allProducts = [];

// Initialize product detail page
async function initProductDetail() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        utils.showNotification('Product not found', 'error');
        return;
    }
    
    // Fetch product and all products
    currentProduct = await api.fetchProduct(productId);
    allProducts = await api.fetchAllProducts();
    
    if (currentProduct) {
        renderProductDetail();
        loadRelatedProducts();
        
        // Setup ScrollTrigger if available
        if (window.gsap && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }
    } else {
        utils.showNotification('Product not found', 'error');
    }
}

// Render product detail
function renderProductDetail() {
    const detailLayout = document.getElementById('productDetail');
    
    if (!detailLayout || !currentProduct) return;
    
    const stars = generateStars(currentProduct.rating.rate);
    
    detailLayout.innerHTML = `
        <div class="breadcrumb">
            <a href="index.html">Home</a>
            <i class="fas fa-chevron-right"></i>
            <a href="products.html">Products</a>
            <i class="fas fa-chevron-right"></i>
            <span>Product Details</span>
        </div>
        
        <div class="detail-layout">
            <div class="detail-image-container">
                <img src="${currentProduct.image}" alt="${currentProduct.title}" class="detail-image">
            </div>
            
            <div class="detail-info">
                <h1>${currentProduct.title}</h1>
                <div class="detail-price">${utils.formatPrice(currentProduct.price)}</div>
                <div class="detail-rating">
                    <span class="rating-stars">${stars}</span>
                    <span class="rating-count">${currentProduct.rating.rate} (${currentProduct.rating.count} reviews)</span>
                </div>
                <p class="detail-description">${currentProduct.description}</p>
                <div class="detail-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateDetailQuantity(-1)">-</button>
                        <input type="number" id="detailQuantity" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn" onclick="updateDetailQuantity(1)">+</button>
                    </div>
                    <button class="btn btn-primary" onclick="addToCartFromDetail()">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Animate product
    if (window.gsap) {
        const imageContainer = document.querySelector('.detail-image-container');
        const detailInfo = document.querySelector('.detail-info');
        
        if (imageContainer) {
            gsap.from(imageContainer, {
                x: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
        
        if (detailInfo) {
            gsap.from(detailInfo, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    }
}

// Load related products
function loadRelatedProducts() {
    const relatedGrid = document.getElementById('relatedProducts');
    
    if (!relatedGrid || !currentProduct) return;
    
    // Get products from same category
    const related = allProducts
        .filter(product => 
            product.category === currentProduct.category && 
            product.id !== currentProduct.id
        )
        .slice(0, 4);
    
    if (related.length === 0) return;
    
    relatedGrid.innerHTML = related.map(product => createProductCard(product)).join('');
    
    // Animate related products
    if (window.gsap) {
        gsap.from(relatedGrid.querySelectorAll('.card'), {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: relatedGrid,
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

// Update detail quantity
function updateDetailQuantity(change) {
    const quantityInput = document.getElementById('detailQuantity');
    if (quantityInput) {
        let quantity = parseInt(quantityInput.value) + change;
        if (quantity < 1) quantity = 1;
        quantityInput.value = quantity;
    }
}

// Add to cart from detail page
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const quantityInput = document.getElementById('detailQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    cartAPI.addToCart(currentProduct, quantity);
    
    // Reset quantity
    if (quantityInput) quantityInput.value = 1;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initProductDetail);

