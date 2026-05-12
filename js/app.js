/* © Github @Shineii86 — AniFinder v2.0 — Main Application */

import * as api from './api.js';
import { getFavorites, addFavorite, removeFavorite, isFavorite, getSearchHistory, addSearchHistory, clearSearchHistory } from './state.js';
import { $, $$, show, hide, toast, createAnimeCard, createSkeletonCard, createFavItem, formatNumber, debounce, initStars } from './ui.js';

/* ─── DOM References ─── */
let heroSection, searchSection, resultsSection, detailSection, errorState;
let searchInput, searchSubmit, loadingOverlay;
let trendingScroll, topScroll;
let resultsGrid, resultsCount;
let favoritesPanel, favoritesList, overlay;
let detailBack;

const STATE = {
    currentView: 'home', // home | results | detail
    currentAnime: null,
    searchQuery: '',
    searchPage: 1,
    searchTotal: 0,
    isLoading: false,
};

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', async () => {
    // Cache DOM
    heroSection = $('#hero-section');
    searchSection = $('#search-section');
    resultsSection = $('#results-section');
    detailSection = $('#detail-section');
    errorState = $('#error-state');
    searchInput = $('#search-input');
    searchSubmit = $('#search-submit');
    loadingOverlay = $('#loading-overlay');
    trendingScroll = $('#trending-scroll');
    topScroll = $('#top-scroll');
    resultsGrid = $('#results-grid');
    resultsCount = $('#results-count');
    favoritesPanel = $('#favorites-panel');
    favoritesList = $('#favorites-list');
    overlay = $('#overlay');
    detailBack = $('#detail-back');

    // Init background
    initStars();

    // Event listeners
    searchSubmit.addEventListener('click', onSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') onSearch(); });
    detailBack?.addEventListener('click', goBack);
    $('#fav-btn')?.addEventListener('click', toggleFavorites);
    $('#close-fav')?.addEventListener('click', toggleFavorites);
    overlay?.addEventListener('click', toggleFavorites);
    $('#random-btn')?.addEventListener('click', loadRandom);

    // Quick tags
    $$('.quick-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            searchInput.value = tag.dataset.search;
            doSearch(tag.dataset.search);
        });
    });

    // Keyboard shortcut: / to focus search
    document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key === 'Escape') {
            if (favoritesPanel?.classList.contains('open')) toggleFavorites();
            else if (STATE.currentView !== 'home') goBack();
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nb = $('.navbar');
        if (window.scrollY > 20) nb?.classList.add('scrolled');
        else nb?.classList.remove('scrolled');
    });

    // Load homepage data
    await loadHomeData();
});

/* ─── Home Data ─── */
async function loadHomeData() {
    // Show skeletons
    showSkeletons(trendingScroll, 6);
    showSkeletons(topScroll, 6);

    try {
        const [trending, top] = await Promise.all([
            api.getTrendingAnime(1, 12).catch(() => ({ data: [] })),
            api.getTopAnime('tv', 1, 12).catch(() => ({ data: [] })),
        ]);

        renderCardScroll(trendingScroll, trending.data || []);
        renderCardScroll(topScroll, top.data || []);
    } catch (err) {
        console.error('Home load error:', err);
    }
}

function renderCardScroll(container, items) {
    if (!container) return;
    container.innerHTML = '';
    if (!items.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No data available</h3><p>Jikan API rate limit — try again shortly.</p></div>';
        return;
    }
    items.forEach(a => {
        container.appendChild(createAnimeCard(a, openDetail));
    });
}

function showSkeletons(container, count) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) container.appendChild(createSkeletonCard());
}

/* ─── Search ─── */
function onSearch() {
    const q = searchInput.value.trim();
    if (!q) { searchInput.focus(); return; }
    doSearch(q);
}

async function doSearch(query, page = 1) {
    STATE.searchQuery = query;
    STATE.searchPage = page;
    STATE.isLoading = true;
    showLoading('Searching...', `"${query}"`);

    addSearchHistory(query);
    switchView('results');

    try {
        const data = await api.searchAnime(query, page, 24);
        STATE.searchTotal = data.pagination?.items?.total || 0;
        renderResults(data.data || [], page);
        resultsCount.innerHTML = `Found <strong>${STATE.searchTotal}</strong> results for "<strong>${escHtml(query)}</strong>"`;
    } catch (err) {
        showError('Search Failed', 'Could not fetch results. The API may be rate-limited — try again in a moment.');
    } finally {
        STATE.isLoading = false;
        hideLoading();
    }
}

function renderResults(items, page) {
    resultsGrid.innerHTML = '';
    if (!items.length) {
        resultsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1">
                <i class="fas fa-search"></i>
                <h3>No anime found</h3>
                <p>Try a different search term or check your spelling.</p>
            </div>`;
        return;
    }
    items.forEach(a => resultsGrid.appendChild(createAnimeCard(a, openDetail)));

    // Pagination
    const totalPages = Math.ceil(STATE.searchTotal / 24);
    if (totalPages > 1) {
        const pag = document.createElement('div');
        pag.style.cssText = 'grid-column:1/-1;display:flex;justify-content:center;gap:12px;padding:20px 0;';
        if (page > 1) {
            const prev = document.createElement('button');
            prev.className = 'quick-tag';
            prev.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
            prev.addEventListener('click', () => doSearch(STATE.searchQuery, page - 1));
            pag.appendChild(prev);
        }
        const info = document.createElement('span');
        info.className = 'quick-tag';
        info.style.cursor = 'default';
        info.textContent = `Page ${page} of ${totalPages}`;
        pag.appendChild(info);
        if (page < totalPages) {
            const next = document.createElement('button');
            next.className = 'quick-tag';
            next.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            next.addEventListener('click', () => doSearch(STATE.searchQuery, page + 1));
            pag.appendChild(next);
        }
        resultsGrid.appendChild(pag);
    }
}

/* ─── Detail View ─── */
async function openDetail(anime) {
    const id = anime.mal_id || anime.id;
    if (!id) return;

    STATE.currentView = 'detail';
    switchView('detail');
    showLoading('Loading details...', anime.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
        const full = await api.getAnimeById(id);
        const a = full.data;
        STATE.currentAnime = a;
        renderDetail(a);
    } catch (err) {
        // Fallback to basic
        try {
            const basic = await api.getAnimeByIdBasic(id);
            STATE.currentAnime = basic.data;
            renderDetail(basic.data);
        } catch {
            showError('Failed to Load', 'Could not fetch anime details.');
            switchView('home');
        }
    } finally {
        hideLoading();
    }
}

function renderDetail(a) {
    const img = a.images?.jpg?.large_image_url || a.images?.jpg?.image_url || 'https://via.placeholder.com/320x450?text=No+Image';
    const score = a.score ?? 'N/A';
    const statusClass = a.status === 'Currently Airing' ? 'airing' : a.status === 'Finished Airing' ? 'finished' : 'upcoming';
    const genres = (a.genres || []).map(g => `<span class="genre-tag">${g.name}</span>`).join('');
    const studios = (a.studios || []).map(s => s.name).join(', ') || 'N/A';
    const producers = (a.producers || []).map(p => p.name).join(', ') || 'N/A';
    const licensors = (a.licensors || []).map(l => l.name).join(', ') || 'N/A';
    const trailerUrl = a.trailer?.url || '';
    const trailerEmbed = a.trailer?.embed_url || '';
    const isFav = isFavorite(a.mal_id);

    const html = `
        <div class="detail-layout">
            <div class="detail-poster-wrap">
                <img class="detail-poster" src="${img}" alt="${escHtml(a.title)}">
                <div class="detail-poster-overlay">
                    <button class="detail-action-btn fav ${isFav ? 'active' : ''}" id="det-fav-btn" title="${isFav ? 'Remove from Favorites' : 'Add to Favorites'}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="detail-action-btn share" id="det-share-btn" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <a class="detail-action-btn random" id="det-random-btn" title="Random Anime" href="#">
                        <i class="fas fa-random"></i>
                    </a>
                </div>
            </div>
            <div class="detail-info">
                <h1 class="detail-title">${escHtml(a.title)}</h1>
                ${a.title_japanese ? `<p class="detail-title-jp">${escHtml(a.title_japanese)}</p>` : ''}

                <div class="detail-badges">
                    <span class="detail-badge score"><i class="fas fa-star"></i> ${score}</span>
                    <span class="detail-badge type">${a.type || 'Unknown'}</span>
                    <span class="detail-badge status ${statusClass}">${a.status || 'Unknown'}</span>
                </div>

                <div class="genre-tags">${genres}</div>

                <div class="detail-meta-grid">
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${a.episodes ?? '?'}</div>
                        <div class="detail-meta-label">Episodes</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${a.duration || 'N/A'}</div>
                        <div class="detail-meta-label">Duration</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${a.year || a.aired?.prop?.from?.year || '?'}</div>
                        <div class="detail-meta-label">Year</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${a.rating || 'N/A'}</div>
                        <div class="detail-meta-label">Rating</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">#${a.rank ?? '?'}</div>
                        <div class="detail-meta-label">Rank</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">#${a.popularity ?? '?'}</div>
                        <div class="detail-meta-label">Popularity</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${formatNumber(a.members)}</div>
                        <div class="detail-meta-label">Members</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value">${formatNumber(a.favorites)}</div>
                        <div class="detail-meta-label">Favorites</div>
                    </div>
                </div>

                <div class="detail-synopsis">
                    <div class="detail-synopsis-title"><i class="fas fa-book-open"></i> Synopsis</div>
                    <p>${escHtml(a.synopsis || 'No synopsis available.')}</p>
                </div>

                ${a.background ? `<div class="detail-synopsis" style="border-left: 3px solid var(--secondary);">
                    <div class="detail-synopsis-title"><i class="fas fa-info-circle" style="color:var(--secondary)"></i> Background</div>
                    <p>${escHtml(a.background)}</p>
                </div>` : ''}

                ${trailerEmbed ? `<div class="detail-trailer">
                    <div class="detail-trailer-title"><i class="fas fa-play-circle"></i> Trailer</div>
                    <div class="trailer-embed">
                        <iframe src="${trailerEmbed}" allowfullscreen loading="lazy"></iframe>
                    </div>
                </div>` : trailerUrl ? `<div class="detail-trailer">
                    <a class="trailer-link" href="${trailerUrl}" target="_blank" rel="noopener">
                        <i class="fab fa-youtube"></i> Watch Trailer
                    </a>
                </div>` : ''}

                <div class="detail-meta-grid" style="margin-top: 24px;">
                    <div class="detail-meta-item">
                        <div class="detail-meta-value" style="font-size:1rem;">${escHtml(studios)}</div>
                        <div class="detail-meta-label">Studios</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value" style="font-size:1rem;">${escHtml(producers)}</div>
                        <div class="detail-meta-label">Producers</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value" style="font-size:1rem;">${escHtml(licensors)}</div>
                        <div class="detail-meta-label">Licensors</div>
                    </div>
                    <div class="detail-meta-item">
                        <div class="detail-meta-value" style="font-size:1rem;">${a.source || 'N/A'}</div>
                        <div class="detail-meta-label">Source</div>
                    </div>
                </div>

                ${a.streaming?.length ? `<div style="margin-top:20px;">
                    <div class="detail-synopsis-title"><i class="fas fa-tv" style="color:var(--accent)"></i> Streaming On</div>
                    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;">
                        ${a.streaming.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="genre-tag" style="text-decoration:none;">${escHtml(s.name)}</a>`).join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;

    const container = $('#detail-content');
    container.innerHTML = html;

    // Wire detail buttons
    $('#det-fav-btn')?.addEventListener('click', () => toggleFavAnime(a));
    $('#det-share-btn')?.addEventListener('click', () => shareAnime(a));
    $('#det-random-btn')?.addEventListener('click', (e) => { e.preventDefault(); loadRandom(); });
}

/* ─── Favorites ─── */
function toggleFavorites() {
    favoritesPanel?.classList.toggle('open');
    overlay?.classList.toggle('active');
    renderFavorites();
}

function renderFavorites() {
    const favs = getFavorites();
    favoritesList.innerHTML = '';
    if (!favs.length) {
        favoritesList.innerHTML = '<div class="favorites-empty"><i class="far fa-heart"></i><p>No favorites yet</p><p style="font-size:0.8rem;margin-top:4px;">Click the heart icon on any anime to save it.</p></div>';
        return;
    }
    favs.forEach(f => {
        favoritesList.appendChild(createFavItem(f,
            (fav) => { toggleFavorites(); openDetail(fav); },
            (id) => { removeFavorite(id); renderFavorites(); updateFavBadge(); toast('Removed from favorites', 'info'); }
        ));
    });
}

function toggleFavAnime(a) {
    const id = a.mal_id;
    if (isFavorite(id)) {
        removeFavorite(id);
        toast('Removed from favorites', 'info');
    } else {
        addFavorite(a);
        toast('Added to favorites!', 'success');
    }
    // Update button state
    const btn = $('#det-fav-btn');
    if (btn) {
        btn.classList.toggle('active', isFavorite(id));
        btn.title = isFavorite(id) ? 'Remove from Favorites' : 'Add to Favorites';
    }
    updateFavBadge();
}

function updateFavBadge() {
    const badge = $('#fav-badge');
    if (badge) badge.style.display = getFavorites().length ? 'block' : 'none';
}

/* ─── Share ─── */
function shareAnime(a) {
    const url = `https://myanimelist.net/anime/${a.mal_id}`;
    const text = `${a.title} — Score: ${a.score || 'N/A'} | ${a.type || ''} ${a.episodes ? a.episodes + ' eps' : ''}`;

    if (navigator.share) {
        navigator.share({ title: a.title, text, url }).catch(() => {});
    } else {
        navigator.clipboard?.writeText(`${text}\n${url}`).then(() => toast('Link copied to clipboard!', 'success')).catch(() => {});
    }
}

/* ─── Random ─── */
async function loadRandom() {
    showLoading('Picking a random anime...', '🎲');
    try {
        const data = await api.getRandomAnime();
        if (data.data) openDetail(data.data);
    } catch {
        toast('Could not load random anime', 'error');
    } finally {
        hideLoading();
    }
}

/* ─── Navigation ─── */
function switchView(view) {
    STATE.currentView = view;
    hide(heroSection); hide(resultsSection); hide(detailSection); hide(errorState);

    switch (view) {
        case 'home':
            show(heroSection);
            break;
        case 'results':
            show(resultsSection);
            break;
        case 'detail':
            show(detailSection);
            break;
    }
}

function goBack() {
    if (STATE.currentView === 'detail' && STATE.searchQuery) {
        switchView('results');
    } else {
        switchView('home');
        searchInput.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Loading ─── */
function showLoading(text, sub) {
    if (!loadingOverlay) return;
    loadingOverlay.querySelector('.loading-text').textContent = text || 'Loading...';
    loadingOverlay.querySelector('.loading-subtext').textContent = sub || '';
    show(loadingOverlay);
}

function hideLoading() {
    hide(loadingOverlay);
}

/* ─── Error ─── */
function showError(title, message) {
    hideLoading();
    if (errorState) {
        errorState.querySelector('h2').textContent = title;
        errorState.querySelector('p').textContent = message;
        show(errorState);
    }
    toast(message, 'error');
}

/* ─── Util ─── */
function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}
