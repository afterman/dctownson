/**
 * dctownson.com — web components
 *
 * Components:
 *   <site-nav>     — sitewide navigation, two variants
 *   <contact-form> — reusable contact section
 *   <dct-chip>     — skill/tag chip with optional project linking
 *   <dct-button>   — button, 4 variants × 3 sizes, icons + loading state
 *
 * Usage:
 *   Homepage:    <site-nav type="home" depth=""></site-nav>
 *   Case study:  <site-nav type="casestudy" title="UA × Samsung" depth="../"></site-nav>
 *   Resume:      <site-nav type="casestudy" title="Résumé" depth="../"></site-nav>
 *
 * Theme preference is persisted in localStorage under 'dct-theme'.
 */

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
          <p class="hero-eyebrow anim anim-2">Hello, I'm Daniel.</p>
          <div class="nav-right">
            <div class="nav-links">
              <dct-button variant="ghost" size="lg" icon-only href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn" aria-label="LinkedIn">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="lg" icon-only href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me" aria-label="Email Me">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="lg" icon-only href="${depth}assets/Daniel_C_Townson_-_Sr_Product_Designer_-_Resume_01Sep26.pdf" target="_blank" rel="noopener" data-tip="Résumé" aria-label="Résumé">
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
        <dct-button variant="ghost" size="md" href="/">
            <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            <span slot="leading">Back to Work</span>
          </dct-button>
          <div class="nav-right">
            <div class="nav-links">
              <dct-button variant="ghost" size="lg" icon-only href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn" aria-label="LinkedIn">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="lg" icon-only href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me" aria-label="Email Me">
                <svg slot="leading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </dct-button>
              <dct-button variant="ghost" size="lg" icon-only href="${depth}assets/Daniel_C_Townson_-_Sr_Product_Designer_-_Resume_01Sep26.pdf" target="_blank" rel="noopener" data-tip="Résumé" aria-label="Résumé">
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
        <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
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