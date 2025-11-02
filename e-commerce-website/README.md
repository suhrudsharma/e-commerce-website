# ShopHub - E-Commerce Website

A fully responsive, front-end-only e-commerce website built with HTML, CSS, and JavaScript that fetches product data from the FakeStore API.

## 🌟 Features

### Core Features

- **Homepage**
  - Hero section with animated background
  - Featured product categories
  - Top products showcase

- **Product Listing Page**
  - Display all products from FakeStore API
  - Advanced filtering system:
    - Filter by category
    - Filter by price range
    - Filter by rating
  - Real-time search functionality
  - Sort by price, rating, or name
  - Pagination for large product lists

- **Product Detail Page**
  - High-quality product images
  - Detailed descriptions
  - Customer ratings and reviews
  - Quantity selector
  - Add to cart functionality
  - Related products section

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time price calculations
  - Tax calculations
  - Empty cart state
  - Checkout simulation

- **Responsive Design**
  - Mobile-friendly layout
  - Tablet optimization
  - Desktop experience
  - Touch-friendly interactions

### Bonus Features

- **Dark Mode Toggle**
  - Switch between light and dark themes
  - Persistent theme preference
  - Smooth transitions

- **Admin Panel** (`/admin`)
  - Simulated Google OAuth login
  - Dashboard with statistics
  - Add new products
  - Manage existing products
  - Delete products
  - Product management table

- **GSAP Animations**
  - Smooth page transitions
  - Scroll-triggered animations
  - Hover effects
  - Loading animations

- **Custom Loader**
  - Loading spinner for API calls
  - Improved perceived performance

- **Search Functionality**
  - Global search bar in navigation
  - Product name and description search
  - Real-time results

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and CDN resources)

### Installation

1. Clone or download this repository
2. Open the `index.html` file in your web browser
3. That's it! The website should load and fetch products from the FakeStore API

### Alternative: Using a Local Server

For the best experience, use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
e-commerce-website/
├── index.html              # Homepage
├── products.html           # Product listing page
├── product-detail.html     # Individual product page
├── cart.html              # Shopping cart page
├── admin.html             # Admin panel
├── styles/
│   ├── main.css           # Main styles and layout
│   ├── components.css     # Reusable components
│   └── responsive.css     # Mobile responsiveness
├── js/
│   ├── utils.js           # Utility functions
│   ├── api.js             # API integration
│   ├── cart.js            # Shopping cart logic
│   ├── darkMode.js        # Dark mode functionality
│   ├── index.js           # Homepage logic
│   ├── products.js        # Products page logic
│   ├── product-detail.js  # Product detail logic
│   ├── cart-page.js       # Cart page logic
│   └── admin.js           # Admin panel logic
└── README.md              # This file
```

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Interactivity and API integration
- **GSAP** - Animations and transitions
- **Font Awesome** - Icons
- **FakeStore API** - Product data
- **LocalStorage** - Persistent cart and preferences

## 🔌 API Integration

The website uses the [FakeStore API](https://fakestoreapi.com/) for product data:

- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `GET /products/category/{category}` - Fetch products by category
- `GET /products/categories` - Fetch all categories

## 🎯 Key Features Implementation

### Dark Mode
- Toggle button in navigation
- Theme preference saved in localStorage
- Smooth color transitions
- CSS custom properties for easy theming

### Search
- Global search input in navbar
- Searches product titles and descriptions
- Debounced API calls
- Results on products page

### Cart Management
- Items stored in localStorage
- Real-time count updates
- Quantity adjustments
- Price calculations
- Persistent across sessions

### Admin Panel
- Simulated Google login
- Dashboard statistics
- Form validation
- Product CRUD operations
- Responsive tables

### Animations
- GSAP ScrollTrigger for scroll animations
- Fade-in effects
- Stagger animations
- Hover interactions
- Loading states

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs!

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- FakeStore API for providing test product data
- GSAP for amazing animation library
- Font Awesome for beautiful icons

## 🐛 Known Limitations

- Admin panel uses simulated authentication (no real OAuth)
- FakeStore API has rate limiting
- Product modifications are local only (not persisted to API)
- Checkout is a simulation (no actual payment processing)

## 🎓 Learning Resources

This project demonstrates:
- Responsive web design
- API integration
- LocalStorage usage
- CSS animations and transitions
- JavaScript ES6+ features
- Modern web development practices

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using HTML, CSS, and JavaScript**
