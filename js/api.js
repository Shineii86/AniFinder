/* © Github @Shineii86 — AniFinder v2.0 — API Layer */

const API_BASE = 'https://api.jikan.moe/v4';
const CACHE = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function apiFetch(endpoint, params = {}) {
    const url = new URL(`${API_BASE}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
    const key = url.toString();

    // Check cache
    const cached = CACHE.get(key);
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

    const res = await fetch(url);
    if (res.status === 429) {
        // Rate limited — wait and retry once
        await new Promise(r => setTimeout(r, 1000));
        const retry = await fetch(url);
        if (!retry.ok) throw new Error(`API error: ${retry.status}`);
        const data = await retry.json();
        CACHE.set(key, { data, ts: Date.now() });
        return data;
    }
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    CACHE.set(key, { data, ts: Date.now() });
    return data;
}

export async function searchAnime(query, page = 1, limit = 24) {
    return apiFetch('/anime', { q: query, page, limit, sfw: true });
}

export async function getAnimeById(id) {
    return apiFetch(`/anime/${id}/full`);
}

export async function getAnimeByIdBasic(id) {
    return apiFetch(`/anime/${id}`);
}

export async function getTopAnime(type = 'tv', page = 1, limit = 12) {
    return apiFetch('/top/anime', { type, page, limit });
}

export async function getTrendingAnime(page = 1, limit = 12) {
    return apiFetch('/seasons/now', { page, limit });
}

export async function getAnimeRecommendations(id) {
    return apiFetch(`/anime/${id}/recommendations`);
}

export async function getAnimeCharacters(id) {
    return apiFetch(`/anime/${id}/characters`);
}

export async function getAnimeReviews(id) {
    return apiFetch(`/anime/${id}/reviews`);
}

export async function getRandomAnime() {
    return apiFetch('/random/anime');
}

export async function getAnimeGenres() {
    return apiFetch('/genres/anime');
}
