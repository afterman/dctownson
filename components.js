/**
 * dctownson.com — site-nav web component
 *
 * Usage:
 *   Homepage:    <site-nav type="home"></site-nav>
 *   Case study:  <site-nav type="casestudy" title="UA × Samsung Galaxy Watch Active2"></site-nav>
 *   Resume:      <site-nav type="home"></site-nav>
 *
 * Theme preference is persisted in localStorage under 'dct-theme'.
 * The component reads and writes that key, and sets data-theme on <html>.
 */

class SiteNav extends HTMLElement {
  connectedCallback() {
    const type  = this.getAttribute('type') || 'home';
    const title = this.getAttribute('title') || '';

    // Determine asset path depth based on type
    // Home and resume pages are at root; case study pages are one level deep
    const depth = this.getAttribute('depth') || (type === 'casestudy' ? '../' : '');

    this.innerHTML = type === 'home'
      ? this._homeNav(depth)
      : this._caseStudyNav(title, depth);

    this._initTheme();
  }

  _themeToggleHTML() {
    return `
      <button class="theme-toggle" id="themeToggle" data-tip="Toggle theme" aria-label="Toggle theme">
        <svg class="icon-sun" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
        </svg>
      </button>
    `;
  }

  _homeNav(depth) {
    return `
      <nav class="home-nav anim anim-1">
        <a href="/" data-tip="Home">
          <img class="nav-logo" src="${depth}assets/images/DCT-Selfie-BW.png" alt="Daniel Townson" />
        </a>

        <div class="nav-right">
          <div class="nav-links">
            <a href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn" class="nav-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6131 4H4.97874C4.32561 4 3.79749 4.51563 3.79749 5.15313V18.8438C3.79749 19.4813 4.32561 20 4.97874 20H18.6131C19.2662 20 19.7975 19.4813 19.7975 18.8469V5.15313C19.7975 4.51563 19.2662 4 18.6131 4ZM8.54436 17.6344H6.16936V9.99687H8.54436V17.6344ZM7.35686 8.95625C6.59436 8.95625 5.97874 8.34062 5.97874 7.58125C5.97874 6.82188 6.59436 6.20625 7.35686 6.20625C8.11624 6.20625 8.73186 6.82188 8.73186 7.58125C8.73186 8.3375 8.11624 8.95625 7.35686 8.95625ZM17.4319 17.6344H15.06V13.9219C15.06 13.0375 15.0444 11.8969 13.8256 11.8969C12.5912 11.8969 12.4037 12.8625 12.4037 13.8594V17.6344H10.035V9.99687H12.31V11.0406H12.3412C12.6569 10.4406 13.4319 9.80625 14.585 9.80625C16.9881 9.80625 17.4319 11.3875 17.4319 13.4438V17.6344V17.6344Z" fill="currentColor"/></svg>
            </a>
            <a href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me" class="nav-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7975 4H3.79749C2.69749 4 1.80749 4.9 1.80749 6L1.79749 18C1.79749 19.1 2.69749 20 3.79749 20H19.7975C20.8975 20 21.7975 19.1 21.7975 18V6C21.7975 4.9 20.8975 4 19.7975 4ZM19.7975 18H3.79749V8L11.7975 13L19.7975 8V18ZM11.7975 11L3.79749 6H19.7975L11.7975 11Z" fill="currentColor"/></svg>
            </a>
            <a href="${depth}resume" data-tip="Résumé" class="nav-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9H9H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>${this._themeToggleHTML()}
          </div>
          
        </div>
      </nav>
    `;
  }

  _caseStudyNav(title, depth) {
    return `
      <nav class="cs-nav">
        <div class="nav-inner">
          <a class="nav-back" href="${depth === '../' ? '/' : '/'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Work
          </a>
          <span class="nav-title">${title}</span>
          <div class="nav-right">
            ${this._themeToggleHTML()}
          </div>
        </div>
      </nav>
    `;
  }

  _initTheme() {
    const html   = document.documentElement;
    const saved  = localStorage.getItem('dct-theme');
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

/**
 * <contact-form> — reusable contact section
 *
 * Usage: <contact-form></contact-form>
 *
 * Replace YOUR_FORM_ID with your Formspree endpoint.
 */

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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send message
          </button>
        </form>
      </section>
    `;
  }
}

customElements.define('contact-form', ContactForm);