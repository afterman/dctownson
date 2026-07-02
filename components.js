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
        <div class="nav-left">
          <a href="/" data-tip="Home">
            <img class="nav-logo" src="${depth}assets/images/DCT-Selfie-BW.png" alt="Daniel Townson" />
          </a>
          <div class="nav-divider"></div>
          <div class="nav-links">
            <a href="https://www.linkedin.com/in/danieltownson/" target="_blank" rel="noopener" data-tip="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6131 4H4.97874C4.32561 4 3.79749 4.51563 3.79749 5.15313V18.8438C3.79749 19.4813 4.32561 20 4.97874 20H18.6131C19.2662 20 19.7975 19.4813 19.7975 18.8469V5.15313C19.7975 4.51563 19.2662 4 18.6131 4ZM8.54436 17.6344H6.16936V9.99687H8.54436V17.6344ZM7.35686 8.95625C6.59436 8.95625 5.97874 8.34062 5.97874 7.58125C5.97874 6.82188 6.59436 6.20625 7.35686 6.20625C8.11624 6.20625 8.73186 6.82188 8.73186 7.58125C8.73186 8.3375 8.11624 8.95625 7.35686 8.95625ZM17.4319 17.6344H15.06V13.9219C15.06 13.0375 15.0444 11.8969 13.8256 11.8969C12.5912 11.8969 12.4037 12.8625 12.4037 13.8594V17.6344H10.035V9.99687H12.31V11.0406H12.3412C12.6569 10.4406 13.4319 9.80625 14.585 9.80625C16.9881 9.80625 17.4319 11.3875 17.4319 13.4438V17.6344V17.6344Z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.threads.net/@dctownson" target="_blank" rel="noopener" data-tip="Threads">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0665 4C17.1385 4.0001 18.5012 7.86767 18.7979 9.05371L17.4532 9.39062C17.1521 8.18658 16.0239 5.38584 12.0665 5.38574C10.3448 5.38574 8.99437 5.87817 8.05279 6.84863C6.5849 8.36208 6.33963 10.751 6.39263 12.4883C6.44894 14.3301 7.10852 18.6143 12.0069 18.6143C14.6955 18.6142 16.7225 17.1516 16.7227 15.2119C16.7227 14.1054 16.3579 13.3867 15.4991 12.8926C15.2092 14.8513 14.0523 16.0672 12.2833 16.2051C11.2163 16.2871 10.239 15.9461 9.59967 15.2676C9.06988 14.7054 8.83567 13.9773 8.94049 13.2178C9.04412 12.4664 9.46627 11.8395 10.1612 11.4043C11.1457 10.7877 12.5745 10.6297 14.1065 10.9453C13.8282 9.44163 12.8645 9.14303 12.253 9.11133C10.8034 9.03717 10.2803 9.92024 10.2588 9.95801L9.03912 9.2998C9.07585 9.23068 9.97049 7.6039 12.3253 7.72656C13.8032 7.80337 15.3762 8.81365 15.5538 11.3828C17.2719 12.0976 18.1094 13.3551 18.1094 15.2119C18.1093 17.9416 15.4855 20 12.0069 20C7.76669 20 5.14965 17.2074 5.00689 12.5303C4.91913 9.65561 5.62863 7.35701 7.05767 5.88379C8.2702 4.63384 9.95545 4 12.0665 4ZM12.6055 12.1719C11.9254 12.1719 11.329 12.3081 10.8965 12.5791C10.556 12.7923 10.36 13.071 10.3135 13.4072C10.2543 13.8374 10.4411 14.14 10.6085 14.3174C10.9537 14.6837 11.5405 14.8729 12.1758 14.8232C13.6201 14.7108 14.072 13.5267 14.1651 12.3818C13.6218 12.2419 13.092 12.1719 12.6055 12.1719Z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.alltrails.com/members/daniel-townson" target="_blank" rel="noopener" data-tip="AllTrails">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9607 9.7897C16.5253 8.96549 16.1889 8.57261 15.7522 8.57261C15.2645 8.57261 15.0497 8.82847 14.7557 9.28567C14.5182 9.59255 14.2892 10.0127 13.9076 9.97078C13.5048 9.92881 13.2716 8.98506 12.9677 8.1951C12.5507 7.11852 12.3104 6 11.6179 6C11.2228 6 10.8772 6.35653 10.3415 7.15418L4.80718 15.5676C4.17113 16.6211 3.63897 17.3551 4.31248 18.0451C5.104 18.8001 6.96268 17.4789 8.23479 16.6819C9.50686 15.885 10.8073 15.109 12.6447 15.1509C15.1182 15.2069 16.3197 17.6676 17.8179 18.136C18.8356 18.4576 19.7685 18.0871 19.9663 17.0454C20.083 16.4729 19.8808 15.9171 19.6017 15.3243L16.9607 9.7897ZM16.791 14.7245C16.2893 15.095 15.5896 14.5008 15.1373 14.2491C14.6567 13.9835 13.844 13.3473 12.3882 13.3683C11.2009 13.3822 10.5578 13.8227 9.85106 14.2981C8.31747 15.3327 6.93229 16.5351 6.53653 15.9129C6.28211 15.5144 6.96763 14.7175 8.57895 12.2288C9.72383 10.4601 10.5302 9.04798 11.1019 9.04798C11.7338 9.04798 11.7691 9.66246 11.8652 10.2923C12.0468 11.2955 12.5415 11.8177 13.1839 11.9002C13.9041 11.9967 14.5267 11.3976 15.0214 11.4039C15.4836 11.4137 15.7875 12.0771 16.1691 12.7692C16.6525 13.629 17.1571 14.4518 16.791 14.7245Z" fill="currentColor"/></svg>
            </a>
            <a href="mailto:dctownson@gmail.com?subject=Hi%20Daniel!" data-tip="Email Me">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7975 4H3.79749C2.69749 4 1.80749 4.9 1.80749 6L1.79749 18C1.79749 19.1 2.69749 20 3.79749 20H19.7975C20.8975 20 21.7975 19.1 21.7975 18V6C21.7975 4.9 20.8975 4 19.7975 4ZM19.7975 18H3.79749V8L11.7975 13L19.7975 8V18ZM11.7975 11L3.79749 6H19.7975L11.7975 11Z" fill="currentColor"/></svg>
            </a>
            <a href="${depth}resume" data-tip="Résumé">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9H9H8" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
        <div class="nav-right">
          ${this._themeToggleHTML()}
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
