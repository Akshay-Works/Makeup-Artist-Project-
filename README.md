# Anvita Sharma Bridal Studio — Website

A complete, production-ready luxury bridal makeup and Mehendi artist website. Built with pure HTML, CSS, and Vanilla JavaScript. Zero dependencies, zero build process.

---

## 🌸 Live Preview

Deploy instantly to GitHub Pages, Netlify, or Vercel.

---

## 📁 Project Structure

```
/
├── index.html          ← Main website (all sections)
├── styles.css          ← Complete stylesheet (luxury design system)
├── script.js           ← All JavaScript interactions
├── manifest.json       ← PWA Web App Manifest
├── robots.txt          ← SEO robots configuration
├── sitemap.xml         ← XML sitemap for search engines
├── assets/
│   ├── images/         ← (Add your own bridal portfolio images here)
│   └── icons/
│       └── favicon.svg ← SVG favicon
└── README.md           ← This file
```

---

## ✨ Features

### Design
- Luxury blush pink, rose gold, ivory & gold colour palette
- Cormorant Garamond serif headings + Jost body font + Great Vibes script
- Premium micro-animations and scroll-reveal effects
- Mobile-first responsive design (works on all screen sizes)
- Elegant preloader with brand initials

### Sections (20 total)
1. **Hero** — Full-screen bridal image with CTA buttons & trust badges
2. **Stats Bar** — Animated counters (500+ brides, 7 years, 4.9★, 350+ weddings)
3. **About** — Personal story, certifications, images with badge
4. **Services** — 9 service cards (Makeup + Mehendi) with descriptions
5. **Portfolio** — Masonry grid with category filters and lightbox
6. **Before & After** — Draggable comparison slider
7. **Packages** — 3 pricing tiers (Essential ₹15K / Premium ₹28K / Luxury ₹45K)
8. **Testimonials** — Auto-playing carousel with 5 client reviews
9. **Google Reviews** — 3 review cards with Google branding
10. **Why Choose Us** — 6 value proposition cards
11. **Brands** — 6 luxury makeup brand logos (MAC, Huda, NARS, Bobbi Brown, Charlotte Tilbury, Kryolan)
12. **Process** — 5-step booking journey
13. **FAQ** — 8 accordion questions
14. **Instagram** — 6-item social proof grid
15. **Location** — Google Maps embed + service cities
16. **Contact** — Inquiry form + WhatsApp + email + phone
17. **Sticky WhatsApp** — Floating button with bounce animation
18. **Floating Book CTA** — Mobile-only bottom bar
19. **Final CTA** — Full-screen emotional call-to-action

### Conversion Features
- WhatsApp form submission (form data → WhatsApp message)
- Social proof toast notifications (slide-in from bottom-left)
- Urgency banner (limited dates available)
- Cookie consent notice
- Animated stat counters on scroll
- Portfolio filter with smooth transitions
- Before/After slider (mouse + touch + keyboard)
- Testimonial auto-carousel with swipe support

### Technical
- Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- No npm, no build tools, no dependencies
- SEO optimised (meta tags, Open Graph, Twitter cards, Schema.org JSON-LD)
- Local Business + Person + AggregateRating schema markup
- Lazy loading images (`loading="lazy"`)
- IntersectionObserver for all animations
- Accessible (ARIA labels, roles, keyboard navigation, focus management)
- Lighthouse 90+ ready

---

## 🚀 Deployment

### GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source → main branch → / (root)**
3. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify (Recommended — Free)
1. Drag and drop this folder into [netlify.com/drop](https://app.netlify.com/drop)
2. Done! Instant live URL

### Vercel
1. `npm install -g vercel` (one-time)
2. Run `vercel` in this folder
3. Follow prompts → live in seconds

---

## ✏️ Customisation Guide

### 1. Change Artist Name & Brand
Search and replace `Anvita Sharma` and `Anvita` across all files.

### 2. Update Phone Number
Replace `+91-98765-43210` and `919876543210` with your real number everywhere.

### 3. Update Email
Replace `hello@anvitasharmabridal.com` with your email.

### 4. Update Location
- In `index.html`, update the Google Maps `<iframe>` embed URL
- Update the address in the Location section and Schema markup
- Update city name throughout the file

### 5. Update Domain
Replace `https://anvitasharmabridal.com` with your actual domain in:
- `index.html` (canonical URL, OG tags, Schema)
- `sitemap.xml`

### 6. Add Real Portfolio Images
Replace Unsplash placeholder URLs with your actual portfolio images.
Recommended size: 800×800px minimum, JPEG at 80% quality.

### 7. Update Pricing
In the Packages section, update the `price-amount` values and package features.

### 8. Update Social Links
Replace Instagram/Facebook URLs with your real profiles.

### 9. Activate Google Maps
Replace the iframe `src` with your actual Google Maps embed code:
- Go to Google Maps → Search your studio location → Share → Embed a map → Copy HTML

### 10. Connect a Real Form Backend
The inquiry form currently opens WhatsApp. To also capture leads via email:
- Use [Formspree](https://formspree.io) (free) — add `action="https://formspree.io/f/YOUR_ID"` to the form
- Or use [Netlify Forms](https://www.netlify.com/products/forms/) — add `netlify` attribute to the form

---

## 🎨 Colour Reference

| Variable | Value | Usage |
|---|---|---|
| `--blush` | `#F2D4CF` | Backgrounds, accents |
| `--rose-gold` | `#C9956C` | Primary CTA, accents |
| `--gold` | `#C9A96E` | Gold gradients |
| `--ivory` | `#FBF7F4` | Section backgrounds |
| `--text-dark` | `#1A1008` | Headlines, dark text |
| `--text-muted` | `#7A5C4E` | Body text |

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

---

## 📄 Licence

This website template was built exclusively for Anvita Sharma Bridal Studio. All content, copywriting, and design are proprietary. Images are sourced from Unsplash (free to use under Unsplash Licence).

---

*Crafted with love for Pune's most beautiful brides. 🌸*
