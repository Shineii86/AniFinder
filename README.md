# AniFinder — *Advanced Anime Info Finder*

<img src="https://i.ibb.co/HLXxZC5H/file-138.jpg" alt="Preview" width="500"/>

> Search any anime. Get ratings, synopsis, trailers, characters, and streaming links — all in one place.

AniFinder is a modern, fully-featured anime search and discovery web app powered by the **Jikan API** (unofficial MyAnimeList API). Redesigned from the ground up with a modular architecture, smooth animations, and a rich feature set.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://shineii86.github.io/AniFinder/)
[![License](https://img.shields.io/badge/Limit-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Shineii86/AniFinder.svg?style=for-the-badge)](https://github.com/Shineii86/AniFinder/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Shineii86/AniFinder.svg?style=for-the-badge)](https://github.com/Shineii86/AniFinder/issues)

---

## ✨ Features (v2.0)

### Core
- 🔍 **Smart Search** — Search any anime with instant results and pagination
- 📄 **Detail View** — Full anime details: synopsis, background, genres, studios, producers, licensors, streaming links
- 🎬 **Trailer Playback** — Embedded YouTube trailers directly in the detail view
- 📊 **Rich Stats** — Rank, popularity, members, favorites, episode count, duration, rating
- 🏷️ **Genre Tags** — Clickable genre tags for quick context

### Discovery
- 🔥 **Trending Now** — Currently airing anime on the homepage
- 🏆 **Top Rated** — Highest-rated anime of all time
- 🎲 **Random Anime** — Discover something unexpected with one click

### Personalization
- ❤️ **Favorites** — Save and manage your favorite anime (localStorage)
- 📜 **Search History** — Remembers your recent searches
- 🔗 **Share** — Share anime via Web Share API or clipboard

### UI/UX
- 🌌 **Animated Starfield Background** — Canvas-based twinkling stars
- ✨ **Glassmorphism** — Modern frosted-glass card design
- 💀 **Skeleton Loading** — Smooth placeholder cards while data loads
- 🔄 **Smooth Page Transitions** — Fade and slide animations between views
- 🔔 **Toast Notifications** — Non-intrusive feedback messages
- ⌨️ **Keyboard Shortcuts** — `/` to focus search, `Esc` to navigate back
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 🎨 **CSS Custom Properties** — Easy theme customization

### Technical
- 📦 **Modular Architecture** — Separated into CSS, API, State, UI, and App modules
- 🗂️ **Client-side Caching** — API responses cached for 5 minutes
- ⚡ **ES Modules** — Clean, maintainable code with native imports
- 🚫 **Rate Limit Handling** — Automatic retry on Jikan API 429 responses

---

## 🧑‍💻 Tech Stack

**Frontend:**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**API:** [Jikan API v4](https://jikan.moe/) — Unofficial MyAnimeList API

**Design:** Glassmorphism, Canvas Animations, CSS Custom Properties, ES Modules

---

## 📁 Project Structure

```
AniFinder/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (variables, components, responsive)
├── js/
│   ├── api.js          # Jikan API wrapper with caching
│   ├── state.js        # Favorites & search history (localStorage)
│   ├── ui.js           # DOM helpers, toast, card builders, canvas stars
│   └── app.js          # Main application logic & routing
├── CHANGELOG.md        # Version history
├── LICENSE
└── README.md
```

---

## 🤔 How to Use

1. **Search** — Type an anime title and hit Enter or click Search
2. **Browse** — Scroll through Trending and Top Rated on the homepage
3. **Quick Tags** — Click preset tags for instant searches
4. **Details** — Click any anime card to see full details, trailer, and streaming links
5. **Favorites** — Click the heart icon to save anime to your collection
6. **Random** — Click the dice icon for a surprise recommendation
7. **Share** — Use the share button to copy or share anime info

---

## 📥 Installation

No build step required! Pure HTML/CSS/JS with ES modules.

```bash
git clone https://github.com/Shineii86/AniFinder.git
cd AniFinder
# Open index.html in any modern browser
# Or use a local server for ES module support:
npx serve .
```

---

## 🧠 API Usage

```javascript
// Search anime
fetch('https://api.jikan.moe/v4/anime?q=demon+slayer&limit=5&sfw=true')
  .then(res => res.json())
  .then(data => console.log(data));

// Get full details
fetch('https://api.jikan.moe/v4/anime/38000/full')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🎟️ License

Distributed under the MIT License. See [LICENSE](https://github.com/Shineii86/AniFinder/blob/main/LICENSE) for more information.

---

## 💪 Support

For support, please open an issue on GitHub or contact me at ikx7a@hotmail.com

Created with ❤️ by **Sʜɪɴᴇɪ Nᴏᴜᴢᴇɴ**

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shineii86/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/Shineii86)
