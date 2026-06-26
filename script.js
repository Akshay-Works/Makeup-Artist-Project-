/* ================================================
   ANVITA SHARMA BRIDAL STUDIO
   Complete JavaScript — Fixed & Production-Ready
   ================================================ */

'use strict';

/* ─── SAFE GLOBAL STUBS (before defer fires) ─── */
// These are replaced once the script loads; they exist
// so inline onclick handlers never throw ReferenceError.
window.openLightbox  = function() {};
window.closeLightbox = function() {};
window.moveCarousel  = function() {};
window.toggleFaq     = function() {};

/* ─── PRELOADER ──────────────────────────────── */
// Safety: always remove preloader after 4s max (covers slow connections)
const preloaderSafetyTimer = setTimeout(() => removePreloader(), 4000);

function removePreloader() {
  clearTimeout(preloaderSafetyTimer);
  const preloader = document.getElementById('preloader');
  if (!preloader || preloader.dataset.removed) return;
  preloader.dataset.removed = '1';
  preloader.classList.add('hidden');
  document.body.style.overflow = '';
  initScrollReveal();
  initStatCounters();
}

window.addEventListener('load', () => removePreloader());
document.body.style.overflow = 'hidden';

/* ─── NAVIGATION ─────────────────────────────── */
const header    = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
const navLinks  = document.querySelectorAll('.nav-link');

// Scroll behaviour
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile toggle
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
  // show/hide backdrop
  let bd = document.getElementById('nav-backdrop');
  if (isOpen) {
    if (!bd) {
      bd = document.createElement('div');
      bd.id = 'nav-backdrop';
      bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:998;backdrop-filter:blur(2px);';
      bd.addEventListener('click', closeNav);
      document.body.appendChild(bd);
    }
  } else {
    bd?.remove();
  }
});

function closeNav() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  document.getElementById('nav-backdrop')?.remove();
}

// Close on nav link click
navLinks.forEach(link => link.addEventListener('click', closeNav));

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeNav();
    closeLightbox();
  }
});

// Active nav highlight on scroll
const sectionIds = ['hero','about','services','portfolio','packages','testimonials','contact'];
const sectionEls = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

const activeNavObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-30% 0px -65% 0px' });

sectionEls.forEach(el => activeNavObserver.observe(el));

/* ─── SCROLL REVEAL ──────────────────────────── */
function initScrollReveal() {
  const revealSelectors = [
    '.service-card', '.package-card', '.why-item', '.brand-item',
    '.faq-item', '.google-review-card', '.portfolio-item',
    '.contact-form-wrap', '.contact-info-wrap',
    '.location-info', '.location-map', '.insta-item',
    '.testimonial-card',
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ─── STAT COUNTERS ──────────────────────────── */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const plus   = el.querySelector('.stat-plus');
      const duration = 1800;
      const start    = performance.now();
      // Target the .stat-val child span (safe - no text-node ambiguity)
      const valEl    = el.querySelector('.stat-val') || el;

      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * target);
        valEl.textContent = current.toLocaleString('en-IN');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          valEl.textContent = target.toLocaleString('en-IN');
        }
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

/* ─── PORTFOLIO FILTER ────────────────────────── */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Set transition on items once
portfolioItems.forEach(item => {
  item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.style.display = '';
        // Next frame so display:'' takes effect before transition starts
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.92)';
        const hide = () => { if (item.style.opacity === '0') item.style.display = 'none'; };
        setTimeout(hide, 360);
      }
    });
  });
});

/* ─── LIGHTBOX ────────────────────────────────── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(btn) {
  const img = btn.closest('.portfolio-item')?.querySelector('img');
  if (!img || !lightbox) return;
  lightboxImg.src = img.src.replace(/w=\d+/, 'w=1400');
  lightboxImg.alt = img.alt;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Wire up lightbox close button (no inline onclick needed)
document.getElementById('lightboxCloseBtn')?.addEventListener('click', closeLightbox);

// Expose to HTML inline handlers (portfolio zoom buttons still use onclick)
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

/* ─── BEFORE & AFTER SLIDER ──────────────────── */
(function initBASlider() {
  const slider   = document.getElementById('baSlider');
  const handle   = document.getElementById('baHandle');
  const afterDiv = slider?.querySelector('.ba-after');
  if (!slider || !handle || !afterDiv) return;

  let isDragging = false;

  function setPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const x    = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct  = (x / rect.width) * 100;
    afterDiv.style.width  = pct + '%';
    handle.style.left     = pct + '%';
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  // Mouse
  handle.addEventListener('mousedown',  e => { isDragging = true; e.preventDefault(); });
  document.addEventListener('mousemove', e => { if (isDragging) setPosition(e.clientX); });
  document.addEventListener('mouseup',   () => { isDragging = false; });

  // Touch
  handle.addEventListener('touchstart', e => { isDragging = true; e.preventDefault(); }, { passive: false });
  document.addEventListener('touchmove', e => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend',  () => { isDragging = false; });

  // Click anywhere on slider
  slider.addEventListener('click', e => {
    if (handle.contains(e.target)) return;
    setPosition(e.clientX);
  });

  // Keyboard
  handle.addEventListener('keydown', e => {
    const cur = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft')  { afterDiv.style.width = Math.max(0,   cur - 2) + '%'; handle.style.left = Math.max(0,   cur - 2) + '%'; }
    if (e.key === 'ArrowRight') { afterDiv.style.width = Math.min(100, cur + 2) + '%'; handle.style.left = Math.min(100, cur + 2) + '%'; }
  });
})();

/* ─── TESTIMONIALS CAROUSEL ──────────────────── */
(function initCarousel() {
  const track    = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const total = cards.length;
  let current = 0;
  let autoTimer = null;

  function getPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  function getGap() { return 24; } // 1.5rem in px

  function maxIndex() { return Math.max(0, total - getPerView()); }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    // Measure card width at call time (handles resize correctly)
    const cardW = cards[0].getBoundingClientRect().width;
    const offset = current * (cardW + getGap());
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function goNext() { goTo(current < maxIndex() ? current + 1 : 0); }
  function goPrev() { goTo(current > 0 ? current - 1 : maxIndex()); }

  function startAuto() { stopAuto(); autoTimer = setInterval(goNext, 5000); }
  function stopAuto()  { if (autoTimer) clearInterval(autoTimer); }

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    startAuto();
  }, { passive: true });

  // Expose for HTML buttons
  window.moveCarousel = dir => { stopAuto(); dir > 0 ? goNext() : goPrev(); startAuto(); };

  // Resize handler — debounced
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildDots(); goTo(0); }, 200);
  });

  buildDots();
  goTo(0);
  startAuto();
})();

/* ─── FAQ ACCORDION ──────────────────────────── */
window.toggleFaq = function(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Close all open items first
  document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling?.classList.remove('open');
  });

  // Toggle clicked item
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    answer?.classList.add('open');
  }
};

/* ─── CONTACT FORM ────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const dateInput = document.getElementById('wedding-date');
  if (!form) return;

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    const name    = (form.elements['name']?.value   || '').trim();
    const phone   = (form.elements['phone']?.value  || '').trim();
    const date    = (form.elements['date']?.value   || 'TBD');
    const service = (form.elements['service']?.value || 'Not specified');
    const message = (form.elements['message']?.value || '').trim();

    const waMsg = encodeURIComponent(
      `Hi Ranjna! 🌸\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Wedding Date:* ${date}\n` +
      `*Service:* ${service}\n` +
      `*Message:* ${message || 'None'}`
    );

    if (success) success.style.display = 'flex';
    form.reset();
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    setTimeout(() => {
      window.open(`https://wa.me/919356757131?text=${waMsg}`, '_blank', 'noopener,noreferrer');
    }, 800);

    setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
  });

  function validateForm() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        if (valid) field.focus();
        valid = false;
      }
    });
    return valid;
  }

  // Live validation
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur',  () => { field.style.borderColor = field.value.trim() ? '' : '#ef4444'; });
    field.addEventListener('input', () => { if (field.value.trim()) field.style.borderColor = ''; });
  });
})();

/* ─── FLOATING BOOK NOW (MOBILE) ─────────────── */
(function initFloatingCTA() {
  const bar    = document.getElementById('floatingBookNow');
  const hero   = document.getElementById('hero');
  const footer = document.querySelector('.site-footer');
  if (!bar || !hero) return;

  function update() {
    if (window.innerWidth > 768) { bar.style.display = 'none'; return; }
    const heroBottom  = hero.getBoundingClientRect().bottom;
    const footerTop   = footer ? footer.getBoundingClientRect().top : Infinity;
    const show = heroBottom < 0 && footerTop > window.innerHeight;
    bar.style.display = show ? 'block' : 'none';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

/* ─── GOOGLE MAP SCROLL FIX ──────────────────── */
(function fixMapScroll() {
  const iframe = document.querySelector('.location-map iframe');
  if (!iframe) return;
  iframe.style.pointerEvents = 'none';
  iframe.parentElement?.addEventListener('click', () => { iframe.style.pointerEvents = 'auto'; });
  document.addEventListener('click', e => {
    if (!iframe.parentElement?.contains(e.target)) {
      iframe.style.pointerEvents = 'none';
    }
  });
})();

/* ─── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = (header?.offsetHeight ?? 80) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ─── HERO PARALLAX (desktop only, reduced-motion safe) ─── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth <= 768) return; // skip on mobile to avoid jank

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.2}px)`;
    }
  }, { passive: true });
})();

/* ─── PROCESS STEPS ANIMATION ────────────────── */
(function initProcessSteps() {
  const steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;

  steps.forEach(step => {
    step.style.cssText += 'opacity:0;transform:translateY(28px);transition:opacity 0.55s ease,transform 0.55s ease;';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  steps.forEach(step => obs.observe(step));
})();

/* ─── WHATSAPP PULSE ─────────────────────────── */
(function initWAPulse() {
  const wa = document.getElementById('stickyWA');
  if (!wa) return;
  setInterval(() => {
    wa.style.animation = 'none';
    wa.offsetHeight;
    wa.style.animation = 'waBounce 0.65s ease-in-out';
  }, 8000);
})();

// Inject bounce keyframe
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
  @keyframes waBounce {
    0%,100% { transform: scale(1); }
    30% { transform: scale(1.18) rotate(-5deg); }
    60% { transform: scale(1.1) rotate(4deg); }
    80% { transform: scale(1.04); }
  }
  .nav-active { color: var(--rose-gold) !important; }
  .nav-active::after { transform: scaleX(1) !important; }
`;
document.head.appendChild(bounceStyle);

/* ─── SOCIAL PROOF TOASTS ────────────────────── */
(function initToasts() {
  const toasts = [
    { name: 'Priya M.',  action: 'just booked Bridal Makeup',    time: '2 minutes ago'  },
    { name: 'Sneha K.',  action: 'left a 5-star review',         time: '15 minutes ago' },
    { name: 'Ananya J.', action: 'booked the Luxury Bridal Package',    time: '32 minutes ago' },
    { name: 'Riya D.',   action: 'enquired about Mehendi', time: '1 hour ago'    },
    { name: 'Kavita P.', action: 'booked for their wedding',     time: '2 hours ago'    },
  ];
  let idx = 0;

  function showToast() {
    const d     = toasts[idx++ % toasts.length];
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:.75rem;">
        <div style="width:38px;height:38px;border-radius:50%;flex-shrink:0;
          background:linear-gradient(135deg,#F2D4CF,#C9956C);
          display:flex;align-items:center;justify-content:center;
          color:white;font-weight:600;font-size:.875rem;font-family:Georgia,serif;">
          ${d.name.charAt(0)}
        </div>
        <div>
          <strong style="display:block;font-size:.8rem;color:#1A1008;">${d.name}</strong>
          <span style="font-size:.75rem;color:#7A5C4E;">${d.action}</span>
        </div>
      </div>
      <div style="font-size:.6875rem;color:#B89080;margin-top:.35rem;padding-left:50px;">${d.time}</div>`;

    // Keep toasts above floating CTA bar on mobile
    const isMobile = window.innerWidth <= 768;
    toast.style.cssText = `
      position:fixed;bottom:${isMobile ? '5.5rem' : '2rem'};left:1.25rem;
      background:#fff;border:1px solid #EEDDD6;border-radius:14px;
      padding:.875rem 1rem;box-shadow:0 8px 32px rgba(60,30,15,.15);
      z-index:450;max-width:250px;width:calc(100vw - 2.5rem);max-width:250px;
      transform:translateX(calc(-100% - 1.5rem));
      transition:transform 0.4s cubic-bezier(0.22,1,0.36,1);
      font-family:'Jost',sans-serif;`;

    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
    }));

    setTimeout(() => {
      toast.style.transform = 'translateX(calc(-100% - 1.5rem))';
      setTimeout(() => toast.remove(), 450);
    }, 4200);
  }

  setTimeout(() => { showToast(); setInterval(showToast, 12000); }, 7000);
})();

/* ─── URGENCY BANNER ─────────────────────────── */
(function initUrgencyBanner() {
  if (sessionStorage.getItem('urgencyDismissed')) return;

  const banner = document.createElement('div');
  banner.id = 'urgencyBanner';
  banner.setAttribute('role', 'alert');
  banner.innerHTML = `
    <span>🌸 Only <strong>limited slots</strong> available this wedding season —
      <a href="https://wa.me/919356757131?text=Hi!%20I%20want%20to%20check%20availability."
         target="_blank" rel="noopener noreferrer"
         style="color:var(--gold-light);text-decoration:underline;white-space:nowrap;">
        Check Your Date
      </a>
    </span>
    <button id="closeBanner" aria-label="Close">✕</button>`;

  banner.style.cssText = `
    background:linear-gradient(135deg,#1A1008,#3D2B1F);
    color:rgba(255,255,255,.9);text-align:center;
    padding:.625rem 3rem .625rem 1rem;font-size:.8rem;
    font-family:'Jost',sans-serif;position:relative;z-index:1001;
    display:flex;align-items:center;justify-content:center;gap:1rem;line-height:1.5;`;

  // Insert at very top, above everything
  document.body.insertBefore(banner, document.body.firstChild);

  // Push header down
  if (header) header.style.top = banner.offsetHeight + 'px';

  const closeBtn = document.getElementById('closeBanner');
  if (closeBtn) {
    closeBtn.style.cssText = `
      position:absolute;right:.875rem;top:50%;transform:translateY(-50%);
      background:none;border:none;color:rgba(255,255,255,.55);
      font-size:1rem;cursor:pointer;padding:.25rem .375rem;line-height:1;`;

    closeBtn.addEventListener('click', () => {
      banner.style.transition = 'max-height .3s ease, padding .3s ease, opacity .3s ease';
      banner.style.overflow   = 'hidden';
      banner.style.maxHeight  = banner.offsetHeight + 'px';
      requestAnimationFrame(() => {
        banner.style.maxHeight = '0';
        banner.style.padding   = '0';
        banner.style.opacity   = '0';
      });
      setTimeout(() => {
        banner.remove();
        if (header) header.style.top = '';
      }, 320);
      sessionStorage.setItem('urgencyDismissed', '1');
    });
  }
})();

/* ─── COOKIE CONSENT ─────────────────────────── */
(function initCookieNotice() {
  if (localStorage.getItem('cookieOK')) return;

  setTimeout(() => {
    const notice = document.createElement('div');
    notice.setAttribute('role', 'alertdialog');
    notice.setAttribute('aria-label', 'Cookie notice');
    notice.innerHTML = `
      <p style="margin:0;flex:1;font-size:.8rem;line-height:1.5;color:rgba(255,255,255,.8);">
        We use cookies to enhance your experience.
      </p>
      <button id="cookieOK" style="
        padding:.45rem 1.1rem;background:#C9956C;color:#fff;border:none;
        border-radius:100px;font-size:.78rem;cursor:pointer;white-space:nowrap;flex-shrink:0;">
        Accept
      </button>`;

    notice.style.cssText = `
      position:fixed;bottom:1.25rem;left:1.25rem;right:5rem;max-width:480px;
      background:#1A1008;padding:.875rem 1rem;border-radius:12px;
      display:flex;align-items:center;gap:.875rem;
      box-shadow:0 8px 32px rgba(0,0,0,.3);z-index:600;
      animation:fadeUp .4s ease both;font-family:'Jost',sans-serif;`;

    document.body.appendChild(notice);

    document.getElementById('cookieOK')?.addEventListener('click', () => {
      localStorage.setItem('cookieOK', '1');
      notice.style.transition = 'opacity .3s, transform .3s';
      notice.style.opacity    = '0';
      notice.style.transform  = 'translateY(12px)';
      setTimeout(() => notice.remove(), 320);
    });
  }, 3000);
})();

/* ─── IMAGE FALLBACK ─────────────────────────── */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.background = 'linear-gradient(135deg,#F2D4CF,#FAF0EE)';
    this.style.minHeight  = '120px';
    this.removeAttribute('src');
  });
});

/* ─── BACK TO TOP ────────────────────────────── */
document.querySelectorAll('a[href="#hero"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ─── PACKAGE CARD DIM EFFECT ────────────────── */
document.querySelectorAll('.package-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.package-card').forEach(c => {
      c.style.opacity = c !== card ? '0.72' : '1';
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.package-card').forEach(c => { c.style.opacity = ''; });
  });
});

/* ─── DOMContentLoaded INIT ──────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial BA slider position
  const baAfter  = document.querySelector('.ba-after');
  const baHandle = document.getElementById('baHandle');
  if (baAfter && baHandle) {
    baAfter.style.width = '50%';
    baHandle.style.left = '50%';
  }

  // Ensure all portfolio items are visible initially
  portfolioItems.forEach(item => {
    item.style.opacity   = '1';
    item.style.transform = 'scale(1)';
  });
});

/* ─── BRAND MESSAGE ──────────────────────────── */
console.log(
  '%c✨ Ranjna Sharma Bridal Studio%c\nServing Pune\'s most beautiful clients.',
  'color:#C9956C;font-size:1.1rem;font-weight:bold;font-family:Georgia,serif;',
  'color:#7A5C4E;font-size:.85rem;'
);
