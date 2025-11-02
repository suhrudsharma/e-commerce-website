# Quick Start Guide

## 🚀 Running the Website

### Method 1: Direct Browser (Simple)
1. Open `index.html` in your web browser
2. The website will load and display products

### Method 2: Local Server (Recommended)
For best experience with CORS and animations:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit: http://localhost:8000

**Using Node.js:**
```bash
npx http-server -p 8000
```
Then visit: http://localhost:8000

**Using VS Code Live Server:**
1. Right-click `index.html`
2. Select "Open with Live Server"

## 🎯 Testing Features

### Homepage
- View hero section with animated background
- Browse categories
- See featured products

### Products Page
- Filter by category
- Adjust price range slider
- Filter by rating
- Search products
- Sort products
- Navigate pages

### Product Detail
- View full product information
- Adjust quantity
- Add to cart
- See related products

### Cart
- View added items
- Update quantities
- Remove items
- See total price

### Admin Panel
1. Click the admin icon in navbar
2. Click "Login with Google" (demo login)
3. View dashboard
4. Add/manage products

### Dark Mode
- Toggle dark/light mode using moon/sun icon
- Preference is saved automatically

## 📝 Notes

- All data comes from FakeStore API
- Cart is saved in browser localStorage
- Admin login is simulated (no real OAuth)
- Checkout is a demo (no real payment)

## 🌐 Internet Required

- FakeStore API calls
- GSAP animation library
- Font Awesome icons

Enjoy exploring the website! 🎉

