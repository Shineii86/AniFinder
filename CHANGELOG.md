# Changelog

All notable changes to AniFinder are documented here.

---

## [v2.0.2] — 2025-05-12

### 📝 Documentation

- Upgraded README with centered hero layout and badges
- Added Table of Contents with anchor links
- Added feature comparison table (6 categories: Search, Detail, Personalization, UI/UX, Performance, Responsive)
- Added Screenshots section (desktop/mobile placeholders)
- Added API Reference table with all endpoints used
- Added Keyboard Shortcuts reference table
- Added Contributing guide with ideas checklist (light theme, characters, episodes, reviews, filters, watchlist, PWA)
- Added Changelog quick-summary section
- Centered footer with GitHub/Twitter badges and star call-to-action

---

## [v2.0.1] — 2025-05-12

### 🐛 Bug Fixes

**Search**
- Improved search accuracy: results now sorted by score (highest first)
- Added `order_by=score&sort=desc` parameter to Jikan API queries

**Layout**
- Fixed search results appearing below Trending/Top Rated sections
- Wrapped home page sections (hero, trending, top rated) in `#home-sections` container
- Home sections now properly hidden when viewing search results or detail page
- Fixed duplicate `id="hero-section"` on trending section element
- Added scroll-to-top when search begins

---

## [v2.0.0] — 2025-05-12

### 🎨 Full UI/UX Redesign

**Architecture**
- Modularized codebase into separate files: `css/style.css`, `js/api.js`, `js/state.js`, `js/ui.js`, `js/app.js`
- Adopted ES modules for clean dependency management
- Added client-side API response caching (5-minute TTL)
- Added automatic rate-limit retry (HTTP 429 handling)

**New Features**
- **Trending Now** — Homepage section showing currently airing anime
- **Top Rated** — Homepage section with highest-rated anime
- **Multi-result Search** — Grid-based search results with pagination
- **Full Detail View** — Extended info: background, studios, producers, licensors, source, streaming links
- **Embedded Trailers** — YouTube trailer playback directly in detail view
- **Favorites System** — Save/remove anime with localStorage persistence; slide-out panel
- **Search History** — Recent searches tracked locally
- **Share Button** — Web Share API with clipboard fallback
- **Random Anime** — Dice button for random anime discovery
- **Genre Tags** — Clickable genre badges on detail page
- **Keyboard Shortcuts** — `/` to focus search, `Esc` to navigate back
- **Toast Notifications** — Non-intrusive feedback for user actions
- **Skeleton Loading** — Shimmer placeholder cards during data fetch
- **Loading Overlay** — Full-screen spinner with context text
- **Animated Starfield** — Canvas-based twinkling stars background
- **Error State** — Styled error display with ghost icon

**UI Improvements**
- New sticky navbar with glassmorphism blur and scroll effect
- Redesigned hero section with animated gradient title and badge
- Redesigned search bar with integrated icon and rounded pill style
- Quick search tags with icon prefixes and hover effects
- Horizontal scrollable anime cards with snap scrolling
- Card hover effects with image zoom and glow shadows
- Detail page with two-column poster/info layout
- Stats grid with hover lift animations
- Synopsis and background sections with styled containers
- Responsive favorites slide-out panel with overlay
- Custom scrollbar with gradient thumb
- Improved typography using Exo 2 and Nunito
- CSS custom properties for full theme customization
- Improved mobile responsive breakpoints (1024px, 768px, 480px)

**Technical**
- Added Open Graph meta tags
- Added SVG favicon
- Added `meta[name=theme-color]`
- Removed all inline styles — clean separation of concerns
- Updated copyright to 2025
- Updated README with v2.0 feature list and project structure

---

## [v1.0.0] — 2025-01-01

### Initial Release
- Single-file HTML/CSS/JS application
- Anime search via Jikan API
- Basic detail view with poster, rating, synopsis, stats
- Example search shortcuts
- Glassmorphism dark theme
- Responsive layout
- Loading spinner and error state
