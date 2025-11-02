// Shopping Cart Management

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart on page load
function initCart() {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Add product to cart
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    utils.showNotification('Product added to cart!', 'success');
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon && window.gsap) {
        gsap.to(cartIcon, {
            scale: 1.5,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    utils.showNotification('Product removed from cart', 'success');
    renderCart();
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
        }
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        if (subtotalElement) subtotalElement.textContent = '$0.00';
        if (totalElement) totalElement.textContent = '$0.00';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.title}</h3>
                <div class="cart-item-price">${utils.formatPrice(item.price)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="cartAPI.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                        <button class="quantity-btn" onclick="cartAPI.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="cartAPI.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    if (subtotalElement) subtotalElement.textContent = utils.formatPrice(subtotal);
    if (totalElement) totalElement.textContent = utils.formatPrice(total);
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Export cart API
window.cartAPI = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    initCart,
    renderCart,
    updateCartCount
};

// Initialize cart on load
document.addEventListener('DOMContentLoaded', initCart);

