# From Roots to Relevance — National Conference on Indian Knowledge Systems
### ATLAS SkillTech University, BKC, Mumbai

**Theme:** *Honouring the Past. Reimagining the Present. Envisioning Tomorrow.*

An official responsive web portal for the National Conference on **Indian Knowledge Systems (IKS) for a New India**, hosted by **ATLAS SkillTech University** at Equinox Business Park, Off Bandra-Kurla Complex (BKC), Kurla West, Mumbai, Maharashtra, India.

---

## 🌟 Key Features

- **Terracotta & Vedic Gold Visual Identity:** Custom-crafted design system inspired by Indian archaeological tones, sacred geometry, and modern cosmic indigo palette.
- **3D Celestial Astrolabe (Khagola Canvas):** Interactive HTML5 Canvas animation ([`js/hero-canvas.js`](js/hero-canvas.js)) modeling ancient astronomical armillary spheres and neural networks with mouse-reactive parallax.
- **11 Complete Sections:**
  1. **Hero Section:** Official conference title banners, metadata pills, and status ribbon.
  2. **About the Conference:** Multidisciplinary overview linking ancient Indian sciences to NEP 2020 & Viksit Bharat @ 2047.
  3. **Conference Theme:** The 3-pillar continuum: *Honouring the Past*, *Reimagining the Present*, and *Envisioning Tomorrow*.
  4. **Keynote & Plenary Speakers:** Profiles of distinguished scholars across Vedic AI, Kerala School mathematics, reverse pharmacology, and sustainable architecture.
  5. **Important Dates:** Provisional milestone timeline with one-click **Add to Calendar (.ics)** download.
  6. **Call for Papers & Research Awards:** Double-blind review guidelines, proceedings with registered ISBN, awards showcase, and interactive Author Guidelines modal.
  7. **Indicative Tracks:** 8 comprehensive interdisciplinary tracks covering over 40 research directions with expandable topic drawers.
  8. **Registration & Fee Structure:** Transparent tiers for students/scholars, faculty/academicians, industry delegates, and listeners with pre-registration alerts.
  9. **Leadership & Organizing Committee:** University leadership/patrons, Organizing Chair highlight, and department-filtered faculty directory (20 members).
  10. **Venue, Transit & Hotels:** Mumbai coastal panorama, campus address, on-demand Google Maps embed, and airport/rail/metro travel guide.
  11. **Frequently Asked Questions (FAQ):** Interactive accordion resolving common queries for delegates and authors.
  12. **Contact & Inquiries:** Validated query submission form with instant toast notification confirmation.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic, accessible layout adhering to WCAG standards with landmark roles and skip links.
- **CSS3:** Vanilla CSS design system with CSS custom properties, glassmorphism, responsive grid & flexbox layouts, micro-animations, and full mobile responsiveness.
- **JavaScript (ES6+):** Pure vanilla JavaScript without external dependencies.
- **Canvas API:** Custom mathematical 3D projection engine for celestial rings and particle constellations.

---

## 🚀 Running Locally

You can preview the website locally using any static web server:

### Using Python
```bash
python -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Using Node.js (npx)
```bash
npx serve .
```

---

## 📂 Project Structure

```
atlas-iks/
├── css/
│   └── style.css                   # Core design tokens, typography, and component styling
├── images/
│   ├── iks-roots-wisdom.jpg         # Astrolabe & Sanskrit manuscripts with neural networks
│   ├── iks-sustainable-architecture.jpg # Stepwell & solar biophilic architecture
│   ├── iks-research-manuscripts.jpg # Palm-leaf manuscripts & botanical illustrations
│   ├── iks-keynote-symposium.jpg    # Keynote plenary symposium auditorium
│   ├── iks-awards-proceedings.jpg   # Leather-bound ISBN proceedings & gold medal
│   └── venue-mumbai-worli-skyline.jpg # Mumbai coastal skyline banner
├── js/
│   ├── hero-canvas.js              # 3D interactive astrolabe & constellation canvas
│   └── main.js                     # Navigation, accordion, filters, calendar, modal & forms
├── atlas-schools-logo.png          # ATLAS Schools logo (ISDI, ISME, uGDX, Law)
├── atlas-skilltech-logo.png        # Official ATLAS SkillTech University logo
├── atlas-skilltech-logo-reversed.png # Reversed white logo for dark footer
├── favicon.svg                     # Sacred geometry vector favicon
├── index.html                      # Main landing page
└── README.md                       # Project documentation
```

---

## © License & Attribution

Organized and hosted by **ATLAS SkillTech University**, BKC, Mumbai.  
All rights reserved © 2026–2027.