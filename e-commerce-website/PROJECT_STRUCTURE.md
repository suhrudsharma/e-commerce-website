# Project Structure

```
e-commerce-website/
│
├── index.html                 # Homepage
├── products.html              # Products listing page
├── product-detail.html        # Individual product details
├── cart.html                  # Shopping cart
├── admin.html                 # Admin panel
│
├── styles/
│   ├── main.css              # Main styles, layout, theming
│   ├── components.css        # Reusable components (buttons, cards, etc.)
│   └── responsive.css        # Mobile responsiveness
│
├── js/
│   ├── utils.js              # Utility functions
│   ├── api.js                # API integration
│   ├── cart.js               # Shopping cart management
│   ├── darkMode.js           # Dark mode functionality
│   ├── index.js              # Homepage logic
│   ├── products.js           # Products page logic
│   ├── product-detail.js     # Product detail logic
│   ├── cart-page.js          # Cart page logic
│   └── admin.js              # Admin panel logic
│
├── README.md                 # Main documentation
├── QUICKSTART.md             # Quick start guide
├── FEATURES.md               # Feature checklist
├── PROJECT_STRUCTURE.md      # This file
└── package.json              # Project metadata
```

## File Descriptions

### HTML Files
- **index.html**: Homepage with hero section, categories, and featured products
- **products.html**: Full product listing with filters, search, and pagination
- **product-detail.html**: Individual product view with details and related products
- **cart.html**: Shopping cart with items, quantities, and checkout
- **admin.html**: Admin dashboard with product management

### CSS Files
- **main.css**: Base styles, CSS variables, navigation, footer, animations
- **components.css**: Buttons, cards, forms, tables, pagination, cart items
- **responsive.css**: Mobile-first responsive breakpoints

### JavaScript Files
- **utils.js**: Loader, notifications, formatting, animations, helpers
- **api.js**: All FakeStore API integration functions
- **cart.js**: Add/remove items, localStorage, cart count, totals
- **darkMode.js**: Theme switching and persistence
- **index.js**: Homepage initialization, categories, featured products
- **products.js**: Filtering, search, sorting, pagination
- **product-detail.js**: Product rendering, related products, add to cart
- **cart-page.js**: Cart display, checkout handling
- **admin.js**: Login, dashboard, CRUD operations

## Dependencies

### External CDN:
- GSAP (animations)
- ScrollTrigger (scroll animations)
- Font Awesome (icons)
- Google Sign-In SDK (admin panel)

### APIs:
- FakeStore API (product data)

### Browser APIs:
- Fetch API
- localStorage
- URLSearchParams
- DOM APIs

## Data Flow

1. **Page Load** → Fetch products from API
2. **User Interaction** → Update UI state
3. **Cart Actions** → Store in localStorage
4. **Theme Changes** → Persist in localStorage
5. **Filters/Search** → Filter client-side
6. **Admin Changes** → Local state (demo)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 968px
- Desktop: > 968px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading images
- Debounced search
- Client-side filtering
- Pagination for large lists
- CSS animations (hardware accelerated)
- Minimal dependencies

