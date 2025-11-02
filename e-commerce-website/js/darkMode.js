// Dark Mode Management

function initDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Add toggle button event listener
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDarkMode);
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Animate toggle
    const toggle = document.getElementById('darkModeToggle');
    if (toggle && window.gsap) {
        gsap.to(toggle, {
            rotation: 360,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// Export functions
window.darkMode = {
    setTheme,
    toggleDarkMode
};

