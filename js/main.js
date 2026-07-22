(() => {
  'use strict';

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  };
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Generic reveal-on-scroll ---------- */
  const revealTargets = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- Wash / transformation scroll animation ---------- */
  const washSection = document.getElementById('transform');
  const wipeRect = document.getElementById('wipeRect');
  const spongeGroup = document.getElementById('spongeGroup');
  const sudsGroup = document.getElementById('sudsGroup');
  const sparkleGroup = document.getElementById('sparkleGroup');
  const dropletGroup = document.getElementById('dropletGroup');
  const progressBar = document.getElementById('washProgressBar');

  if (washSection && wipeRect) {
    const CAR_X_START = 90;
    const CAR_X_END = 800;
    const CAR_Y_TOP = 90;
    const CAR_Y_BOTTOM = 236;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastBubbleAt = 0;
    let lastDropletAt = 0;
    let sparklesSpawnedForCycle = false;
    let ticking = false;

    function spawnSuds(x, y) {
      const b = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const r = 3 + Math.random() * 6;
      b.setAttribute('cx', x + (Math.random() * 20 - 10));
      b.setAttribute('cy', y + (Math.random() * 24 - 12));
      b.setAttribute('r', r);
      b.setAttribute('fill', '#ffffff');
      b.setAttribute('class', 'suds-bubble');
      b.style.opacity = 0.75;
      sudsGroup.appendChild(b);
      const start = performance.now();
      const life = 700 + Math.random() * 400;
      function fade(t) {
        const p = Math.min(1, (t - start) / life);
        b.style.opacity = String(0.8 * (1 - p));
        b.setAttribute('cy', String(parseFloat(b.getAttribute('cy')) - 0.15));
        if (p < 1) requestAnimationFrame(fade);
        else b.remove();
      }
      requestAnimationFrame(fade);
    }

    function spawnDroplet(x, y) {
      const d = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      d.setAttribute('cx', x + (Math.random() * 30 - 15));
      d.setAttribute('cy', y);
      d.setAttribute('r', 2.5 + Math.random() * 2.5);
      d.setAttribute('fill', '#bfe3ff');
      d.setAttribute('class', 'droplet');
      dropletGroup.appendChild(d);
      requestAnimationFrame(() => d.classList.add('fall'));
      setTimeout(() => d.remove(), 950);
    }

    function spawnSparkles() {
      const positions = [
        [180, 140], [420, 105], [600, 130], [740, 195],
        [260, 205], [520, 210], [340, 100], [660, 165],
      ];
      positions.forEach(([x, y], i) => {
        setTimeout(() => {
          const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const size = 7 + Math.random() * 6;
          s.setAttribute(
            'd',
            `M0,-${size} L${size * 0.28},-${size * 0.28} L${size},0 L${size * 0.28},${size * 0.28} L0,${size} L-${size * 0.28},${size * 0.28} L-${size},0 L-${size * 0.28},-${size * 0.28} Z`
          );
          s.setAttribute('transform', `translate(${x},${y})`);
          s.setAttribute('fill', '#FFFDF2');
          s.setAttribute('class', 'sparkle');
          sparkleGroup.appendChild(s);
          requestAnimationFrame(() => s.classList.add('pop'));
          setTimeout(() => s.remove(), 1100);
        }, i * 90);
      });
    }

    function update() {
      ticking = false;
      const rect = washSection.getBoundingClientRect();
      const total = washSection.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      let progress = total > 0 ? scrolled / total : 0;
      progress = Math.max(0, Math.min(1, progress));

      progressBar.style.width = `${progress * 100}%`;

      // Phase boundaries
      const washStart = 0.08;
      const washEnd = 0.78;
      const shineEnd = 0.92;

      const wipeProgress = Math.max(0, Math.min(1, (progress - washStart) / (washEnd - washStart)));
      const width = wipeProgress * (CAR_X_END + 20);
      wipeRect.setAttribute('width', String(width));

      const spongeX = Math.max(CAR_X_START, Math.min(CAR_X_END, width));
      const wobble = Math.sin(wipeProgress * 26) * 58;
      const spongeY = (CAR_Y_TOP + CAR_Y_BOTTOM) / 2 - 20 + wobble;
      const inWash = progress > 0.005 && progress < washEnd + 0.02;

      spongeGroup.style.opacity = inWash ? '1' : '0';
      spongeGroup.setAttribute(
        'transform',
        `translate(${spongeX},${Math.max(CAR_Y_TOP - 10, Math.min(CAR_Y_BOTTOM - 10, spongeY))}) rotate(${wobble * 0.15})`
      );

      if (!reduceMotion && inWash && wipeProgress > 0 && wipeProgress < 1) {
        const now = performance.now();
        if (now - lastBubbleAt > 60) {
          lastBubbleAt = now;
          spawnSuds(spongeX, spongeY + 10);
        }
        if (now - lastDropletAt > 220) {
          lastDropletAt = now;
          spawnDroplet(spongeX - 10, spongeY + 40);
        }
      }

      const isShining = progress >= washEnd;
      washSection.classList.toggle('is-shining', isShining);
      washSection.classList.toggle('is-final', progress >= shineEnd);

      if (!reduceMotion) {
        if (isShining && !sparklesSpawnedForCycle) {
          sparklesSpawnedForCycle = true;
          spawnSparkles();
        } else if (!isShining) {
          sparklesSpawnedForCycle = false;
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* ---------- Quote form -> mailto ---------- */
  const quoteForm = document.getElementById('quoteForm');
  const formStatus = document.getElementById('formStatus');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(quoteForm);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const vehicle = (data.get('vehicle') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email) {
        formStatus.textContent = 'Please fill in your name and email.';
        return;
      }

      const subject = `Quote Request from ${name}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        vehicle ? `Vehicle: ${vehicle}` : null,
        '',
        message || 'No additional details provided.',
      ].filter(Boolean);

      const mailto = `mailto:hello@whipsandshine.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      window.location.href = mailto;
      formStatus.textContent = 'Opening your email app…';
    });
  }
})();
