<div align="center">

# 🐉 AniFinder

### *Advanced Anime Info Finder*

<img src="https://i.ibb.co/HLXxZC5H/file-138.jpg" alt="AniFinder Preview" width="600" style="border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);"/>

<br/>

> 🔍 Search any anime — get ratings, synopsis, trailers, streaming links, and more.
> A modern, fully-featured anime discovery web app built from scratch.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-AniFinder-brightgreen?style=for-the-badge&logo=googlechrome&logoColor=white)](https://shineii86.github.io/AniFinder/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Shineii86/AniFinder.svg?style=for-the-badge&logo=github)](https://github.com/Shineii86/AniFinder/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Shineii86/AniFinder.svg?style=for-the-badge&logo=github)](https://github.com/Shineii86/AniFinder/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/Shineii86/AniFinder.svg?style=for-the-badge&logo=github)](https://github.com/Shineii86/AniFinder/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/Shineii86/AniFinder.svg?style=for-the-badge&logo=github)](https://github.com/Shineii86/AniFinder/commits/main)

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jikan API](https://img.shields.io/badge/Jikan_API-v4-2E51A8?style=for-the-badge&logo=myanimelist&logoColor=white)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🎮 How to Use](#-how-to-use)
- [🧠 API Reference](#-api-reference)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [🤝 Contributing](#-contributing)
- [📝 Changelog](#-changelog)
- [🎟️ License](#️-license)
- [💬 Support](#-support)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔎 Search & Discovery
- **Smart Search** — Instant results sorted by relevance with pagination
- **Trending Now** — Currently airing anime on the homepage
- **Top Rated** — Highest-rated anime of all time
- **Random Anime** — One-click surprise recommendation
- **Quick Tags** — Preset search shortcuts for popular titles

</td>
<td width="50%">

### 📄 Detail View
- **Full Synopsis** — Complete story description + background info
- **Embedded Trailers** — YouTube playback right in the page
- **Streaming Links** — Where to watch (Crunchyroll, Netflix, etc.)
- **Rich Metadata** — Studios, producers, licensors, source material
- **Stats Dashboard** — Rank, popularity, members, favorites, score

</td>
</tr>
<tr>
<td>

### ❤️ Personalization
- **Favorites System** — Save anime with localStorage persistence
- **Favorites Panel** — Slide-out drawer with quick access
- **Search History** — Remembers your last 10 searches
- **Share Button** — Web Share API + clipboard fallback

</td>
<td>

### 🎨 UI/UX
- **Animated Starfield** — Canvas-based twinkling stars background
- **Glassmorphism** — Frosted-glass cards with subtle borders
- **Skeleton Loading** — Shimmer placeholders while data fetches
- **Toast Notifications** — Non-intrusive feedback messages
- **Smooth Transitions** — Fade/slide animations between views
- **Custom Scrollbar** — Gradient-themed scrollbar

</td>
</tr>
<tr>
<td>

### ⚡ Performance
- **Client-side Caching** — 5-minute API response cache
- **Rate Limit Handling** — Auto-retry on Jikan 429 responses
- **Lazy Loading** — Images load on demand
- **ES Modules** — Native imports, zero bundler needed
- **No Build Step** — Pure HTML/CSS/JS, instant deploy

</td>
<td>

### 📱 Responsive
- **Desktop** — Full 3-column grid layouts
- **Tablet** — Adapted 2-column grids
- **Mobile** — Stacked single-column, full-width search
- **Touch-friendly** — Large tap targets, swipeable scrolls

</td>
</tr>
</table>

---

## 📸 Screenshots

<div align="center">

| Desktop | Mobile |
|:---:|:---:|
| ![Desktop](https://i.ibb.co/HLXxZC5H/file-138.jpg) | ![Mobile](https://i.ibb.co/HLXxZC5H/file-138.jpg) |

</div>

---

## 📁 Project Structure

```
AniFinder/
├── index.html              # Main HTML — navbar, hero, sections, footer
├── css/
│   └── style.css           # All styles — variables, components, responsive
├── js/
│   ├── api.js              # Jikan API wrapper with caching & retry
│   ├── state.js            # Favorites & search history (localStorage)
│   ├── ui.js               # DOM helpers, toast, card builders, canvas stars
│   └── app.js              # Main application logic, routing, event wiring
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml   # Auto-deploy to GitHub Pages
├── CHANGELOG.md            # Version history
├── LICENSE                 # MIT License
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No Node.js, no build tools, no dependencies

### Installation

```bash
# Clone the repo
git clone https://github.com/Shineii86/AniFinder.git

# Navigate to the project
cd AniFinder

# Option 1: Open directly
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Option 2: Local server (recommended for ES modules)
npx serve .
python3 -m http.server 8000
```

### Deploy

AniFinder auto-deploys to **GitHub Pages** on every push to `main`. No build step needed.

For other hosts — just upload the files. It's static HTML/CSS/JS.

---

## 🎮 How to Use

| Action | How |
|---|---|
| 🔍 **Search** | Type a title → press Enter or click Search |
| 🏷️ **Quick Search** | Click a preset tag (Demon Slayer, One Piece, etc.) |
| 📄 **View Details** | Click any anime card |
| ❤️ **Favorite** | Click the heart icon on a card or detail page |
| 🎲 **Random** | Click the dice icon in the navbar |
| 🔗 **Share** | Click the share button on the detail page |
| ⬅️ **Go Back** | Click Back button or press `Esc` |

---

## 🧠 API Reference

AniFinder uses the **[Jikan API v4](https://docs.api.jikan.moe/)** — a REST API that serves anime data from MyAnimeList.

### Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /anime?q={query}` | Search anime by title |
| `GET /anime/{id}/full` | Get complete anime details |
| `GET /top/anime` | Top-rated anime |
| `GET /seasons/now` | Currently airing anime |
| `GET /random/anime` | Random anime |
| `GET /genres/anime` | Genre list |

### Example

```javascript
// Search for "Frieren" sorted by score
fetch('https://api.jikan.moe/v4/anime?q=frieren&limit=5&sfw=true&order_by=score&sort=desc')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Rate Limits

Jikan API allows ~3 requests/second. AniFinder handles 429 responses with automatic retry and caches results for 5 minutes.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus the search bar |
| `Enter` | Submit search |
| `Esc` | Go back / Close panels |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** your branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature
   ```
5. **Open** a Pull Request

### Ideas for Contributions

- [ ] Light/dark theme toggle
- [ ] Character & voice actor section
- [ ] Episode list with air dates
- [ ] User reviews display
- [ ] Advanced filters (genre, year, status)
- [ ] Watchlist with progress tracking
- [ ] PWA support (offline mode)

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

### Latest: v2.0.1 — 2025-05-12

- 🔍 Improved search accuracy (sorted by score)
- 🐛 Fixed results appearing below home sections
- 📦 Modular architecture with ES modules
- 🎨 Complete UI/UX redesign from scratch

---

## 🎟️ License

Distributed under the **MIT License**. See [LICENSE](https://github.com/Shineii86/AniFinder/blob/main/LICENSE) for details.

---

## 💬 Support

<div align="center">

**Need help?** [Open an Issue](https://github.com/Shineii86/AniFinder/issues) · [Email](mailto:ikx7a@hotmail.com)

<br/>

### Created with ❤️ by **Sʜɪɴᴇɪ Nᴏᴜᴢᴇɴ**

[![GitHub](https://img.shields.io/badge/Shineii86-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shineii86/)
[![Twitter](https://img.shields.io/badge/@Shineii86-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/Shineii86)

<br/>

**⭐ If you like AniFinder, give it a star! ⭐**

</div>
