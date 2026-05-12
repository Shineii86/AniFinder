/* © Github @Shineii86 — AniFinder v2.0 — UI Helpers */

export function $(sel, ctx = document) { return ctx.querySelector(sel); }
export function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

export function show(el) { el?.classList.add('active'); }
export function hide(el) { el?.classList.remove('active'); }

export function createEl(tag, cls, html) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
}

/* ─── Toast ─── */
let toastContainer;

export function toast(message, type = 'info', duration = 3000) {
    if (!toastContainer) {
        toastContainer = createEl('div', 'toast-container');
        document.body.appendChild(toastContainer);
    }
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    const t = createEl('div', `toast ${type}`, `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`);
    toastContainer.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateX(40px)';
        t.style.transition = '0.3s ease';
        setTimeout(() => t.remove(), 300);
    }, duration);
}

/* ─── Anime Card ─── */
export function createAnimeCard(anime, onClick) {
    const card = createEl('div', 'anime-card');
    const img = anime.images?.jpg?.image_url || anime.image || 'https://via.placeholder.com/200x280?text=No+Image';
    const score = anime.score ?? '—';
    const type = anime.type ?? '';
    const eps = anime.episodes ?? '?';

    card.innerHTML = `
        <div class="anime-card-img-wrap">
            <img class="anime-card-img" src="${img}" alt="${escHtml(anime.title)}" loading="lazy">
            <div class="anime-card-score"><i class="fas fa-star"></i> ${score}</div>
        </div>
        <div class="anime-card-body">
            <div class="anime-card-title">${escHtml(anime.title)}</div>
            <div class="anime-card-meta">
                <span><i class="fas fa-film"></i> ${type}</span>
                <span><i class="fas fa-play"></i> ${eps} eps</span>
            </div>
        </div>
    `;
    card.addEventListener('click', () => onClick(anime));
    return card;
}

/* ─── Skeleton Card ─── */
export function createSkeletonCard() {
    return createEl('div', 'skeleton-card', `
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
        </div>
    `);
}

/* ─── Favorite Item ─── */
export function createFavItem(fav, onClick, onRemove) {
    const item = createEl('div', 'fav-item');
    item.innerHTML = `
        <img class="fav-item-img" src="${fav.image || 'https://via.placeholder.com/50x70?text=N/A'}" alt="">
        <div class="fav-item-info">
            <div class="fav-item-title">${escHtml(fav.title)}</div>
            <div class="fav-item-meta">${fav.type || ''} · ${fav.score ? '⭐ ' + fav.score : 'N/A'}</div>
        </div>
        <button class="fav-remove" title="Remove"><i class="fas fa-times"></i></button>
    `;
    item.querySelector('.fav-item-info').addEventListener('click', () => onClick(fav));
    item.querySelector('.fav-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        onRemove(fav.id);
    });
    return item;
}

/* ─── Escape HTML ─── */
function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

/* ─── Format Number ─── */
export function formatNumber(n) {
    if (!n) return 'N/A';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toLocaleString();
}

/* ─── Debounce ─── */
export function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

/* ─── Background Stars Canvas ─── */
export function initStars() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, stars = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        const count = Math.floor((w * h) / 8000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.3,
                a: Math.random(),
                da: (Math.random() - 0.5) * 0.01,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
            s.a += s.da;
            if (s.a > 1 || s.a < 0.1) s.da *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 210, 230, ${s.a})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    resize();
    createStars();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); });
}
