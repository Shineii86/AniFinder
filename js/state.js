/* © Github @Shineii86 — AniFinder v2.0 — State Management */

const STORAGE_KEYS = {
    FAVORITES: 'anifinder_favorites',
    SEARCH_HISTORY: 'anifinder_search_history',
};

function loadJSON(key, fallback = []) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
}

function saveJSON(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

/* ─── Favorites ─── */
export function getFavorites() {
    return loadJSON(STORAGE_KEYS.FAVORITES);
}

export function addFavorite(anime) {
    const favs = getFavorites();
    if (favs.some(f => f.id === anime.id)) return false;
    favs.unshift({
        id: anime.id,
        title: anime.title,
        title_japanese: anime.title_japanese,
        image: anime.images?.jpg?.image_url || anime.image || '',
        score: anime.score,
        type: anime.type,
        episodes: anime.episodes,
        addedAt: Date.now(),
    });
    saveJSON(STORAGE_KEYS.FAVORITES, favs);
    return true;
}

export function removeFavorite(id) {
    const favs = getFavorites().filter(f => f.id !== id);
    saveJSON(STORAGE_KEYS.FAVORITES, favs);
    return favs;
}

export function isFavorite(id) {
    return getFavorites().some(f => f.id === id);
}

/* ─── Search History ─── */
export function getSearchHistory() {
    return loadJSON(STORAGE_KEYS.SEARCH_HISTORY);
}

export function addSearchHistory(query) {
    let history = getSearchHistory().filter(h => h.query !== query);
    history.unshift({ query, timestamp: Date.now() });
    if (history.length > 10) history = history.slice(0, 10);
    saveJSON(STORAGE_KEYS.SEARCH_HISTORY, history);
}

export function clearSearchHistory() {
    saveJSON(STORAGE_KEYS.SEARCH_HISTORY, []);
}
