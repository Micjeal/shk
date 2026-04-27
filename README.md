# Skahhe Travel Care

A professional transport and travel agency website for Skahhe Travel Care (U) Ltd, showcasing premium transportation services across Uganda with an elegant modern design and smooth interactions.

## Project Structure

```
travel/
├── index.html              # Main HTML entry point
├── README.md               # This file
└── assets/
    ├── css/
    │   ├── navbar.css      # Navigation bar (fixed, blur, mobile hamburger, theme variables)
    │   ├── hero.css        # Hero section with headline and scroll indicator
    │   ├── bento.css       # Bento grid cards (topics, reviews, orb, stats)
    │   ├── about.css       # About section styling
    │   ├── services.css    # Services section cards
    │   ├── fleet.css       # Fleet catalog and stats bar
    │   ├── gallery.css     # Gallery/tours section
    │   ├── demo.css        # Demo/video section
    │   ├── partnership.css # Partnership section
    │   ├── profile.css     # Business profile section
    │   ├── testimonials.css # Testimonials grid
    │   ├── final-cta.css   # Final call-to-action section
    │   ├── footer.css      # Footer with contact info
    │   ├── layout.css      # Global variables and responsive breakpoints
    │   └── responsiveness.css # Mobile-specific styles
    ├── js/
    │   └── main.js         # All interactivity (nav, counters, reveal, testimonials, scroll spy)
    └── images/
        └── .gitkeep        # Directory placeholder
```

## Features

- **Modern Design System**: Elegant color palette with custom CSS variables and Playfair Display typography
- **Bento Grid Layout**: Sophisticated card-based layout showcasing services, reviews, and statistics
- **Interactive Elements**:
  - Animated navigation with blur backdrop and mobile hamburger menu
  - Scroll-triggered reveal animations with staggered delays
  - Interactive orb with mouse-tracking tilt effect
  - Animated counters for statistics
  - Ripple effects on button clicks
  - Topic tag selection system
  - Rotating testimonials in hero section (4-second intervals)
  - Scroll spy navigation highlighting active sections
  - Smooth scrolling to sections
- **Responsive Design**: Fully responsive with mobile-first approach and adaptive layouts
- **Mobile-First Navigation**: Slide-in menu from left with smooth animations
- **Performance Optimized**: Smooth animations and transitions using CSS transforms and GPU acceleration

## Sections

1. **Navigation**: Fixed header with blur backdrop, logo, navigation links, and CTA button with scroll spy functionality
2. **Hero Section**: Two-column layout with:
   - Left column: Company headline, subtitle, and scroll indicator
   - Right column: Bento grid with topic selector, rotating reviews, interactive orb, and statistics
3. **About Section**: Company information with visual leadership image and contact details
4. **Services Section**: Three service cards showcasing Executive Car Rentals, Group Transport, and Scenic Tour Packages
5. **Stats Bar**: Light-mode statistics bar showing years of excellence, fleet size, and customer support
6. **Fleet Section**: Comprehensive fleet catalog with 9 vehicle types including Vans, SUVs, Sedans, and luxury vehicles
7. **Gallery Section**: Visual journey showcase with masonry layout of tour destinations
8. **Demo Section**: Founder video with company information
9. **Partnership Section**: Strategic alliances showcase
10. **Profile Section**: Business profile with downloadable document
11. **Testimonials Section**: Client testimonials grid with 6 reviews from various organizations
12. **Final CTA Section**: Call-to-action for contacting the company
13. **Footer**: Contact information, office locations, and social media links

## Getting Started

1. Clone or download the project
2. Open `index.html` in your web browser
3. No additional setup required - it's a static website

## Technologies Used

- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern features including:
  - CSS Grid and Flexbox layouts
  - CSS custom properties (variables)
  - CSS animations and transitions
  - Backdrop filters and gradients
  - Responsive design with media queries
- **Vanilla JavaScript**: ES6+ features including:
  - Intersection Observer API for scroll animations
  - RequestAnimationFrame for smooth counters
  - Event delegation and modern DOM manipulation
  - No external frameworks or dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Color Scheme

Update CSS variables in `assets/css/navbar.css`:

```css
:root {
  --white:     #FAFAF8;
  --ink:       #0D0D0D;
  --sand:      #E8E0D4;
  --gold:      #C9A96E;
  --rose:      #E8C4B8;
  --violet:    #6B4FBB;
  --dark-card: #111118;
}
```

### Typography

Fonts are imported in `assets/css/layout.css`. Modify font weights and families as needed.

### Component Styling

- **Navigation**: Modify `assets/css/navbar.css`
- **Hero Section**: Update `assets/css/hero.css`
- **Bento Grid**: Customize cards in `assets/css/bento.css`
- **About Section**: Edit `assets/css/about.css`
- **Services**: Style in `assets/css/services.css`
- **Fleet**: Modify `assets/css/fleet.css`
- **Gallery**: Update `assets/css/gallery.css`
- **Testimonials**: Style in `assets/css/testimonials.css`
- **Footer**: Edit `assets/css/footer.css`
- **Layout & Animations**: Adjust in `assets/css/layout.css`
- **Mobile Styles**: Update `assets/css/responsiveness.css`

### JavaScript Functionality

Main features in `assets/js/main.js`:
- Hamburger menu toggle with slide-in animation
- Active navigation state with scroll spy
- Topic tag selection
- Scroll reveal animations
- Counter animations
- Orb mouse-tracking
- Button ripple effects
- Rotating testimonials (4-second intervals)
- Smooth scrolling to sections
- Navigation scroll shadow effect

## Images

The current design uses CSS gradients and SVG icons, requiring minimal images. Add custom images to `assets/images/` as needed:

- Avatar images for review cards (optional)
- Custom background images (optional)
- Logo variations (optional)

The orb animation and visual effects are created using pure CSS gradients.

## Future Enhancements

- [ ] Light/Dark mode toggle functionality
- [ ] Additional fleet vehicle types
- [ ] Advanced filtering for tour packages
- [ ] Integration with booking systems
- [ ] Interactive destination map
- [ ] Multi-language support
- [ ] Performance analytics integration
- [ ] Blog/news section
- [ ] Customer portal for bookings

## License

This project is open source and available under the [MIT License](LICENSE).
