// Cart page functionality

// Initialize cart page
function initCartPage() {
    // Check if checkout button exists
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// Handle checkout
function handleCheckout() {
    if (cartAPI.getCartCount() === 0) {
        utils.showNotification('Your cart is empty', 'error');
        return;
    }
    
    // In a real application, this would redirect to a payment page
    utils.showNotification('Checkout functionality would be implemented here', 'success');
    
    // For demo purposes, clear the cart after checkout
    setTimeout(() => {
        cartAPI.clearCart();
    }, 2000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initCartPage);

