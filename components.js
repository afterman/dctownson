/**
 * dctownson.com — web components
 *
 * Components:
 *   <site-nav>     — sitewide navigation, two variants
 *   <contact-form> — reusable contact section
 *   <site-footer>  — shared page footer
 *   <dct-chip>     — skill/tag chip with optional project linking
 *   <meta-tile>    — icon + label + value tile for case study meta
 *                    sections (Role, Timeframe, Responsibilities, etc)
 *   <dct-lightbox> — click-to-enlarge viewer for .img-wrap images
 *                    (DEFINED BUT UNUSED — not placed on any page as
 *                    of Sep 2026; the enlarged image often rendered
 *                    smaller than the inline one, so it was pulled.
 *                    Fix that sizing issue before re-adding <dct-lightbox>
 *                    tags to the case study pages.)
 *   <dct-button>   — button, 4 variants × 3 sizes, icons + loading state
 *
 * Usage:
 *   Homepage:    <site-nav type="home" depth=""></site-nav>
 *   Case study:  <site-nav type="casestudy" title="UA × Samsung" depth="../"></site-nav>
 *   Resume:      <site-nav type="casestudy" title="Résumé" depth="../"></site-nav>
 *
 * Theme preference is persisted in localStorage under 'dct-theme'.
 */

// Current résumé PDF, relative to the site root. Both nav variants
// link here — swap the filename once when a new résumé ships.
const RESUME_PATH = 'assets/resume/Daniel_Townson_Resume_DesignSystems_2026.pdf';

class SiteNav extends HTMLElement {
  connectedCallback() {
    const type  = this.getAttribute('type') || 'home';
    const title = this.getAttribute('title') || '';
    const depth = this.getAttribute('depth') || '';

    this.innerHTML = type === 'home'
      ? this._homeNav(depth)
      : this._caseStudyNav(title, depth);

    this._initTheme();
  }

  _themeToggleHTML() {
    return `
      <button class="theme-toggle" id="themeToggle" data-tip="Theme" aria-label="Toggle theme">
        <svg class="icon-sun" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
        </svg>
      </button>
    `;
  }

  _homeNav(depth) {
    return `
      <nav class="home-nav anim anim-1">
        <div class="nav-inner">
          <div class="nav-pill nav-name anim anim-2">
            <img class="nav-avatar" src="${depth}assets/images/DCT-Selfie-BW.png" alt="" />
            <span class="hero-eyebrow">Daniel C Townson</span>
          </div>
          <div class="nav-right">
            <div class="nav-links">
              <dct-button variant="ghost" size="sm" icon-only href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn" aria-label="LinkedIn">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="sm" icon-only href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me" aria-label="Email Me">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="sm" icon-only href="${depth}${RESUME_PATH}" target="_blank" rel="noopener" data-tip="Résumé" aria-label="Résumé">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
                  <path d="M9 9l1 0" />
                  <path d="M9 13l6 0" />
                  <path d="M9 17l6 0" />
                </svg>
              </dct-button>
              ${this._themeToggleHTML()}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  _caseStudyNav(title, depth) {
    return `
      <nav class="cs-nav">
        <div class="nav-inner anim anim-1">
          <div class="nav-pill nav-pill--back">
          <dct-button variant="ghost" size="sm" href="/" aria-label="Back to Work">
            <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            <span slot="leading">Back to Work</span>
          </dct-button>
          </div>
          <div class="nav-right">
            <div class="nav-pill nav-links">
              <dct-button variant="ghost" size="sm" icon-only href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn" aria-label="LinkedIn">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="sm" icon-only href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me" aria-label="Email Me">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="sm" icon-only href="${depth}${RESUME_PATH}" target="_blank" rel="noopener" data-tip="Résumé" aria-label="Résumé">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
                  <path d="M9 9l1 0" />
                  <path d="M9 13l6 0" />
                  <path d="M9 17l6 0" />
                </svg>
              </dct-button>
            </div>
            <div class="nav-pill nav-pill--icon">
              ${this._themeToggleHTML()}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  _initTheme() {
    const html  = document.documentElement;
    const saved = localStorage.getItem('dct-theme');
    if (saved) html.setAttribute('data-theme', saved);

    const btn = this.querySelector('#themeToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('dct-theme', next);
    });
  }
}

customElements.define('site-nav', SiteNav);

/* ============================================================
   <contact-form> — reusable contact section
   Replace YOUR_FORM_ID with your Formspree endpoint.
   Usage: <contact-form></contact-form>
   ============================================================ */

class ContactForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="contact-section">
        <div class="contact-header">
          <h2>Get in touch</h2>
          <p>Interested in working together? Send a message below or email me directly at <a href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!">dctownson@gmail.com</a>.</p>
        </div>
        <form class="contact-form" action="https://formspree.io/f/mdajeejo" method="POST">
          <div class="form-row">
            <div class="form-field">
              <label class="form-label" for="cf-name">Name</label>
              <input class="form-input" type="text" id="cf-name" name="name" placeholder="Your name" required />
            </div>
            <div class="form-field">
              <label class="form-label" for="cf-email">Email</label>
              <input class="form-input" type="email" id="cf-email" name="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div class="form-field">
            <label class="form-label" for="cf-message">Message</label>
            <textarea class="form-textarea" id="cf-message" name="message" placeholder="What's on your mind?" required></textarea>
          </div>
          <button class="form-submit" type="submit">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
            Send message
          </button>
        </form>
      </section>
    `;
  }
}

customElements.define('contact-form', ContactForm);

/* ============================================================
   <site-footer> — shared page footer
   Copyright year is computed at render time so it never needs
   a manual yearly update across pages.
   Usage: <site-footer></site-footer>
   ============================================================ */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year  = new Date().getFullYear();
    const depth = this.getAttribute('depth') || '';
    // dct.design isn't registered yet — links to the in-repo token
    // reference page instead. Swap back to the external domain once
    // it's live by changing this one href.
    this.innerHTML = `
      <p class="footer-built">
        Built with <a href="https://claude.ai" target="_blank" rel="noopener">Claude Code</a> using <a href="${depth}tokens/">dct tokens</a> and Tabler icons.
      </p>
      <p class="footer-copy">© ${year} Daniel C Townson</p>
    `;
  }
}

customElements.define('site-footer', SiteFooter);

/* ============================================================
   <bg-pattern> — fixed background line pattern
   20 nested rounded squares whose lines spread out like rays from the
   top-left corner. Units are CSS px on a 1440-wide page; style.css
   "Background pattern" scales and places the whole thing. Each value
   below is the first line's, plus a step per line, so the spacing and
   spread can be tuned from one number:

     corner   the right-hand corner of the line, where the ray ends
     heading  the ray's angle in degrees, clockwise from horizontal
     size     the length of the square's sides

   Rendered as inline SVG (not a CSS mask) so each line can animate on
   its own — see style.css for the fan-in motion.

   Usage: <bg-pattern aria-hidden="true"></bg-pattern> as the first
   child of <body>.
   ============================================================ */
const BG_PATTERN = {
  lines: 20,
  corner: [91, 447],
  cornerStep: [56.8, 2.9],
  heading: 56,
  headingStep: -1.58,
  size: 761,
  sizeStep: 35,
  radius: 30,
};

class BgPattern extends HTMLElement {
  connectedCallback() {
    const p = BG_PATTERN;
    const rects = Array.from({ length: p.lines }, (_, i) => {
      const x = p.corner[0] + i * p.cornerStep[0];
      const y = p.corner[1] + i * p.cornerStep[1];
      const size = p.size + i * p.sizeStep;
      const heading = p.heading + i * p.headingStep;
      // The <g> carries the animation: a CSS transform on the <rect>
      // itself would replace its rotation (the transform attribute).
      return `<g style="--i: ${i}"><rect x="${x - size}" y="${y}" width="${size}" height="${size}" rx="${p.radius}" transform="rotate(${heading} ${x} ${y})" /></g>`;
    }).join('');
    this.innerHTML = `
      <svg viewBox="0 0 1440 1622" preserveAspectRatio="xMinYMin meet" fill="none" stroke="currentColor" stroke-width="1.5" focusable="false">
        ${rects}
      </svg>
    `;
  }
}

customElements.define('bg-pattern', BgPattern);

/* ============================================================
   Page exit — plays the home page's out animation when a case
   study card is clicked, then navigates. Adds .is-leaving to <html>
   (style.css "Page exit" does the motion) and .is-active to the
   clicked card so it can linger a beat after the rest has gone.

   Where the browser supports cross-page view transitions, the
   clicked card's image is named "cs-hero" — the same name as the
   case study's hero image — so it stays put during the exit and
   then morphs into the hero (style.css "Page transition"). The
   html also gets .can-morph so the CSS keeps that image visible.
   Skipped for new-tab clicks and when reduced motion is on.
   ============================================================ */
const PAGE_EXIT_MS = 600;
const CAN_MORPH = 'onpagereveal' in window;

// Warm the case study's hero image on hover / touch / click, so the
// morph lands on a loaded image instead of an empty box that pops in
// later. Reads the image path from the page's <cs-hero image="…">.
// Chrome also prerenders the whole page (speculationrules in
// index.html); this covers browsers that don't.
const warmedHeroes = new Set();

function warmCaseStudyHero(href) {
  if (warmedHeroes.has(href)) return;
  warmedHeroes.add(href);
  fetch(href)
    .then(res => res.text().then(page => ({ page, url: res.url })))
    .then(({ page, url }) => {
      const m = page.match(/<cs-hero[^>]*\simage="([^"]+)"/);
      if (!m) return;
      const img = new Image();
      img.src = new URL(m[1], url).href;
      img.decode().catch(() => {});
    })
    .catch(() => warmedHeroes.delete(href));
}

function initPageExit() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const html = document.documentElement;

  document.querySelectorAll('a.cs-card').forEach(card => {
    const warm = () => warmCaseStudyHero(card.href);
    card.addEventListener('pointerenter', warm);
    card.addEventListener('pointerdown', warm);
    card.addEventListener('focus', warm);

    card.addEventListener('click', e => {
      warm();
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduceMotion.matches || html.classList.contains('is-leaving')) return;

      e.preventDefault();
      card.classList.add('is-active');
      if (CAN_MORPH) {
        card.querySelector('.cs-card-media').style.viewTransitionName = 'cs-hero';
        html.classList.add('can-morph');
      }
      html.classList.add('is-leaving');
      setTimeout(() => { location.href = card.href; }, PAGE_EXIT_MS);
    });
  });

  // Coming back with the browser's Back button can restore this page
  // from cache mid-exit — reset it so the content is visible again.
  window.addEventListener('pageshow', e => {
    if (!e.persisted) return;
    html.classList.remove('is-leaving', 'can-morph');
    document.querySelectorAll('a.cs-card.is-active').forEach(c => {
      c.classList.remove('is-active');
      c.querySelector('.cs-card-media').style.viewTransitionName = '';
    });
  });
}

initPageExit();

// The home page prerenders a case study on hover (speculationrules in
// index.html). Its entrance animations would play out unseen in the
// background, so rewind them when the page is actually shown —
// prerenderingchange fires before the first visible frame.
if (document.prerendering) {
  document.addEventListener('prerenderingchange', () => {
    document.getAnimations().forEach(a => { a.currentTime = 0; });
  }, { once: true });
}

/* ============================================================
   <dct-chip> — skill/tag chip component
   Attributes:
     data-projects  — comma-separated project IDs this chip
                      links to (used by resume page interaction)
   Usage:
     <dct-chip>Design Systems</dct-chip>
     <dct-chip data-projects="ua-baselayer,olysense">Token Architecture</dct-chip>
   ============================================================ */

class DctChip extends HTMLElement {
  connectedCallback() {
    const label    = this.textContent.trim();
    const projects = this.getAttribute('data-projects') || '';

    this.innerHTML = `
      <span class="dct-chip${projects ? ' dct-chip--linked' : ''}"
            ${projects ? `data-projects="${projects}"` : ''}>
        ${label}
      </span>
    `;
  }
}

customElements.define('dct-chip', DctChip);

/* ============================================================
   <meta-tile> — icon + label + value tile for case study meta
   sections (Role, Timeframe, Responsibilities, Keywords, etc).
   Icon is passed as a light-DOM <svg> child, same pattern as
   <dct-button>'s slot="leading" — real markup, captured once on
   connect, so any icon set (currently Tabler) can be swapped in
   per-usage without touching this component.

   Usage:
     <meta-tile label="Role" value="Lead Designer">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
         <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
         <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
         <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
       </svg>
     </meta-tile>

   Four of these side by side go in a <div class="meta-grid">.
   ============================================================ */

class MetaTile extends HTMLElement {
  connectedCallback() {
    if (!this._captured) {
      const iconEl = this.querySelector('svg');
      this._iconHTML = iconEl ? iconEl.outerHTML : '';
      this._captured = true;
    }

    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '';

    this.innerHTML = `
      <div class="meta-tile-icon">${this._iconHTML}</div>
      <p class="meta-tile-label">${label}</p>
      <p class="meta-tile-value">${value}</p>
    `;
  }
}

customElements.define('meta-tile', MetaTile);

/* ============================================================
   <cs-hero> — case study hero block: header + hero image +
   meta grid, rendered together in one canonical order (title
   above image, then Role/Timeframe/Responsibilities/Keywords).

   This exists to kill layout drift between case study pages —
   before this, each page hand-duplicated the header/hero/meta
   markup (including four full SVG icon blocks), and pages had
   silently drifted: some had the title above the hero image,
   some below; some had the header inside .content, some outside
   (which also meant inconsistent horizontal alignment, since
   .content used to double up .page's own padding — see the
   .content fix below). Now there's exactly one place — this
   file — that decides the order, the icons, and the animation
   timing for every case study page at once.

   Usage:
     <cs-hero
       eyebrow="Wearable · Coaching"
       title="Find Your Form with a co-branded smartwatch"
       summary="Sync Under Armour's shoes with Samsung's watch to
                create a connected coaching experience based on
                real-time data."
       image="../assets/images/cs.uasamsung.mmr.heroimage.png"
       image-alt="Samsung Galaxy Watch Active2 hero shot"
       role="Lead UX/UI Designer"
       timeframe="2018 – 2020"
       responsibilities="On-watch UX/UI, device sync, real-time coaching"
       keywords="Wearable, Coaching, Integrations, Design System">
     </cs-hero>

   The hero image is always named view-transition "cs-hero", so the
   home card that was clicked morphs into it (see Page exit below).

   To change the icon used for one of the four meta fields site-
   wide, edit CS_HERO_ICONS below — every case study page picks
   it up on next load, no per-page edits needed.
   ============================================================ */

const CS_HERO_ICONS = {
  user: '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />',
  calendar: '<path d="M3 4l18 0" /><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" /><path d="M12 16l0 4" /><path d="M9 20l6 0" /><path d="M8 12l3 -3l2 2l3 -3" />',
  tasks: '<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M9 14l2 2l4 -4" />',
  tags: '<path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />',
};

function csHeroIcon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${CS_HERO_ICONS[name]}</svg>`;
}

class CsHero extends HTMLElement {
  connectedCallback() {
    const eyebrow = this.getAttribute('eyebrow') || '';
    const title = this.getAttribute('title') || '';
    const summary = this.getAttribute('summary') || '';
    const chip = this.getAttribute('chip') || '';
    const image = this.getAttribute('image') || '';
    const imageAlt = this.getAttribute('image-alt') || '';
    const role = this.getAttribute('role') || '';
    const timeframe = this.getAttribute('timeframe') || '';
    const responsibilities = this.getAttribute('responsibilities') || '';
    const keywords = this.getAttribute('keywords') || '';

    this.innerHTML = `
   
      <header class="cs-header">
        <p class="cs-type anim anim-1">${eyebrow}</p>
        <h1 class="cs-title anim anim-2">${title}</h1>
        <p class="cs-summary anim anim-3">${summary}</p>
        ${chip ? `<dct-chip class="anim anim-4">${chip}</dct-chip>` : ''}
      </header>
      <div class="hero-bleed anim anim-3" style="view-transition-name: cs-hero;">
        <img src="${image}" alt="${imageAlt}" />
      </div>
      <div class="meta-grid">
        <meta-tile class="anim" label="Role" value="${role}">${csHeroIcon('user')}</meta-tile>
        <meta-tile class="anim" label="Timeframe" value="${timeframe}">${csHeroIcon('calendar')}</meta-tile>
        <meta-tile class="anim" label="Responsibilities" value="${responsibilities}">${csHeroIcon('tasks')}</meta-tile>
        <meta-tile class="anim" label="Keywords" value="${keywords}">${csHeroIcon('tags')}</meta-tile>
      </div>
    `;
  }
}

customElements.define('cs-hero', CsHero);

/* ============================================================
   <dct-lightbox> — click-to-enlarge viewer for .img-wrap images
   Wires up every .img-wrap already on the page (from .img-grid
   sections) when it connects. Markup, CSS (still in style.css —
   .lightbox*) and open/close behavior all live here instead of
   being copy-pasted into each case study page's own <script>.

   Because components.js is loaded with `defer`, this — like every
   other component on the site — only upgrades after the full page
   has parsed, so every .img-wrap is already in the DOM by the time
   it wires up. No ordering dependency to get wrong.

   Usage: <dct-lightbox></dct-lightbox>  (one per page, placed
   anywhere in the body — position doesn't matter, it's fixed/
   full-screen once open)
   ============================================================ */

class DctLightbox extends HTMLElement {
  connectedCallback() {
    this.classList.add('lightbox');
    this.innerHTML = `
      <button class="lightbox-close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <img class="lightbox-img" src="" alt="" />
      <p class="lightbox-caption"></p>
    `;

    const img   = this.querySelector('.lightbox-img');
    const cap   = this.querySelector('.lightbox-caption');
    const close = this.querySelector('.lightbox-close');

    const open = (src, alt, caption) => {
      img.src = src;
      img.alt = alt || '';
      cap.textContent = caption || '';
      this.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      this.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { img.src = ''; }, 200);
    };

    document.querySelectorAll('.img-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const wrapImg = wrap.querySelector('img');
        if (wrapImg) open(wrapImg.src, wrapImg.alt, wrap.dataset.caption);
      });
    });

    close.addEventListener('click', closeLightbox);
    this.addEventListener('click', e => {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
}

customElements.define('dct-lightbox', DctLightbox);

/* ============================================================
   <theme-swap> — theme-aware visual for case study sections.
   Two modes, chosen by what's passed in:

   1. IMAGE PAIR — a static export per theme:
        <theme-swap
          light-src="../assets/images/cs.ods.colorswatch.light.png"
          dark-src="../assets/images/cs.ods.colorswatch.dark.png"
          alt="OlySense color tokens and palette"
          caption="OlySense color tokens and palette">
        </theme-swap>
      Renders as a normal .img-wrap/.img-caption pair, so
      <dct-lightbox> and .img-grid keep working untouched — it's a
      drop-in replacement for <img> inside an .img-wrap. If an
      asset looks the same in both themes, skip this component and
      use a plain <img> instead — don't pass the same file as both
      light-src and dark-src.

   2. LIVE EXAMPLE — pass real markup as children instead of
      light-src/dark-src, and it's rendered as-is, framed the same
      way and labeled "Live example". That markup should read its
      colors from the project's own token scope so it re-themes for
      free when [data-theme] flips.

   Switching itself needs zero JS in either mode — both variants
   swap purely through [data-theme="dark"] CSS (see style.css),
   the same mechanism the rest of the site already uses.
   ============================================================ */

class ThemeSwap extends HTMLElement {
  connectedCallback() {
    const lightSrc = this.getAttribute('light-src');
    const darkSrc  = this.getAttribute('dark-src');
    const alt      = this.getAttribute('alt') || '';
    const caption  = this.getAttribute('caption') || '';

    if (lightSrc && darkSrc) {
      this.innerHTML = `
        <div class="img-wrap theme-swap-images" data-caption="${caption}">
          <img class="theme-swap-light" src="${lightSrc}" alt="${alt}" />
          <img class="theme-swap-dark"  src="${darkSrc}"  alt="${alt}" />
        </div>
        ${caption ? `<p class="img-caption">${caption}</p>` : ''}
      `;
      return;
    }

    const content = this.innerHTML;
    this.innerHTML = `
      <div class="img-wrap theme-swap-live">
        <span class="theme-swap-badge">Live example</span>
        ${content}
      </div>
      ${caption ? `<p class="img-caption">${caption}</p>` : ''}
    `;
  }
}

customElements.define('theme-swap', ThemeSwap);

/* ============================================================
   <dct-button> — button component
   Variants:    primary | secondary | ghost | destructive | link
   Sizes:       sm | md | lg (link ignores height/padding, see below)
   Attributes:
     variant     — primary (default) | secondary | ghost | destructive | link
     size        — sm | md (default) | lg
     href        — renders an <a> instead of a <button>
     target      — forwarded to the <a> when href is set
     rel         — forwarded to the <a> when href is set
     type        — button (default) | submit | reset
     icon-only   — square icon button (requires aria-label)
     loading     — shows a spinner in place of the leading icon,
                   disables the button
     disabled    — disables the button
     aria-label  — required when icon-only; forwarded either way

   Icons are passed as child elements marked slot="leading" /
   slot="trailing" — real SVG markup, captured once on connect.
   Everything else in the light DOM becomes the label text.

   Usage:
     <dct-button>Default primary</dct-button>

     <dct-button variant="secondary" size="sm">
       <svg slot="leading">...</svg>
       Download
     </dct-button>

     <dct-button variant="ghost" icon-only aria-label="Close">
       <svg slot="leading">...</svg>
     </dct-button>

     <dct-button variant="destructive">Delete project</dct-button>

   variant="link" drops the button box entirely — no background, no
   fixed height/padding, font-size inherits from context — so it reads
   as an inline text link dropped into a sentence, not another CTA:

     <p>Read more in the <dct-button variant="link" href="/case-study">
       full case study</dct-button>.</p>

   Scripting a loading state (e.g. while a fetch is in flight):
     const btn = document.querySelector('#send-btn');
     btn.setLoading(true);
     // ...await the request...
     btn.setLoading(false);
   ============================================================ */

class DctButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'loading', 'disabled', 'icon-only', 'href', 'type', 'aria-label', 'target', 'rel'];
  }

  connectedCallback() {
    if (!this._captured) {
      const leadingEl  = this.querySelector('[slot="leading"]');
      const trailingEl = this.querySelector('[slot="trailing"]');
      if (leadingEl)  leadingEl.removeAttribute('slot');
      if (trailingEl) trailingEl.removeAttribute('slot');

      this._leadingHTML  = leadingEl  ? leadingEl.outerHTML  : '';
      this._trailingHTML = trailingEl ? trailingEl.outerHTML : '';
      this._label        = this.textContent.trim();
      this._captured      = true;
    }
    this._render();
  }

  attributeChangedCallback() {
    if (this._captured) this._render();
  }

  setLoading(isLoading)   { this.toggleAttribute('loading', !!isLoading); }
  setDisabled(isDisabled) { this.toggleAttribute('disabled', !!isDisabled); }

  _spinnerHTML() {
    return `<svg class="dct-btn-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9" /></svg>`;
  }

  _render() {
    const variant    = this.getAttribute('variant') || 'primary';
    const size       = this.getAttribute('size') || 'md';
    const type       = this.getAttribute('type') || 'button';
    const href       = this.getAttribute('href');
    const target     = this.getAttribute('target');
    const rel        = this.getAttribute('rel');
    const iconOnly   = this.hasAttribute('icon-only');
    const isLoading  = this.hasAttribute('loading');
    const isDisabled = this.hasAttribute('disabled') || isLoading;
    const ariaLabel  = this.getAttribute('aria-label');

    if (iconOnly && !ariaLabel) {
      console.warn('<dct-button icon-only> needs an aria-label — screen readers have nothing else to announce.');
    }

    const classes = [
      'dct-btn',
      `dct-btn--${variant}`,
      `dct-btn--${size}`,
      iconOnly ? 'dct-btn--icon-only' : '',
      isLoading ? 'dct-btn--loading' : '',
    ].filter(Boolean).join(' ');

    const leading  = isLoading ? this._spinnerHTML() : this._leadingHTML;
    const trailing = isLoading ? '' : this._trailingHTML;
    const label    = this._label
      ? `<span class="dct-btn-label${iconOnly ? ' dct-btn-label--hidden' : ''}">${this._label}</span>`
      : '';
    const inner = `${leading}${label}${trailing}`;

    const attrs = [`class="${classes}"`];
    if (ariaLabel) attrs.push(`aria-label="${ariaLabel}"`);
    if (isLoading) attrs.push('aria-busy="true"');

    if (href) {
      if (isDisabled) attrs.push('aria-disabled="true"', 'tabindex="-1"');
      else attrs.push(`href="${href}"`);
      if (target) attrs.push(`target="${target}"`);
      if (rel) attrs.push(`rel="${rel}"`);
      this.innerHTML = `<a ${attrs.join(' ')}>${inner}</a>`;
    } else {
      attrs.push(`type="${type}"`);
      if (isDisabled) attrs.push('disabled', 'aria-disabled="true"');
      this.innerHTML = `<button ${attrs.join(' ')}>${inner}</button>`;
    }
  }
}

customElements.define('dct-button', DctButton);

/* ============================================================
   Locked case study cards — soft client-side gate
   ------------------------------------------------------------
   NOT real security. This site is static (no backend), so the full
   case study page ships to the browser regardless — anyone who views
   source, checks network requests, or requests the URL directly with
   a tool other than a browser can read it without ever seeing this
   form. All this does is keep a casual visitor from clicking through,
   and keep the page out of search results (see the noindex meta tag
   on the gated page itself). Good enough for "not ready to share
   widely yet" — not for anything that actually needs to stay private.

   Usage: add data-locked="<slug>" and data-lock-hash="<sha256 hex of
   your password>" to a .card <a> in index.html. The matching page
   (e.g. /<slug>/index.html) should redirect back to "/?locked=<slug>"
   in an early <head> script when localStorage 'dct-unlocked-<slug>'
   isn't set to '1' — see ods/index.html for the pattern.

   To generate a hash for a new password, run this in any browser
   console (never commit the plaintext password anywhere):
     crypto.subtle.digest('SHA-256', new TextEncoder().encode('your password'))
       .then(buf => console.log([...new Uint8Array(buf)]
         .map(b => b.toString(16).padStart(2, '0')).join('')));
   ============================================================ */

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function initLockedCards() {
  document.querySelectorAll('.card[data-locked]').forEach(card => {
    const slug = card.dataset.locked;
    const hash = card.dataset.lockHash;
    if (!slug || !hash) return;

    const unlockKey = `dct-unlocked-${slug}`;
    if (localStorage.getItem(unlockKey) === '1') return; // already unlocked — behaves as a normal link

    const overlay = card.querySelector('.card-overlay-text');
    if (!overlay) return;

    let formShown = false;

    function showForm() {
      formShown = true;
      overlay.classList.add('card-lock-form');
      overlay.innerHTML = `
        <span class="card-type card-type--locked">
          <svg class="card-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Private case study
        </span>
        <p class="card-lock-message">This one's not public yet — enter the password to view it.</p>
        <div class="card-lock-fields">
          <input type="password" class="card-lock-input" placeholder="Password" autocomplete="off" aria-label="Password for ${slug} case study" />
          <dct-button type="button" variant="ghost" size="sm" class="card-lock-submit">View</dct-button>
        </div>
        <p class="card-lock-error" hidden>That's not it — try again.</p>
      `;

      const input     = overlay.querySelector('.card-lock-input');
      const submitBtn = overlay.querySelector('.card-lock-submit');
      const errorEl   = overlay.querySelector('.card-lock-error');

      async function attempt() {
        const value = input.value;
        if (!value) return;
        const entered = await sha256Hex(value);
        if (entered === hash) {
          localStorage.setItem(unlockKey, '1');
          window.location.href = card.getAttribute('href');
        } else {
          errorEl.hidden = false;
          input.value = '';
          input.focus();
        }
      }

      submitBtn.addEventListener('click', e => { e.stopPropagation(); attempt(); });
      input.addEventListener('click', e => e.stopPropagation());
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); attempt(); }
      });

      requestAnimationFrame(() => input.focus());
    }

    card.addEventListener('click', e => {
      e.preventDefault();
      if (!formShown) showForm();
    });

    // Bounced back from the gated page itself (see its <head> guard
    // script) — open the form right away instead of making them click twice.
    if (new URLSearchParams(location.search).get('locked') === slug) {
      showForm();
      card.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });
}

initLockedCards();