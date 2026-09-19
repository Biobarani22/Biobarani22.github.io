/* Barani Kumar Rajendran — site behavior
   Theme toggle, scroll reveal, active-section nav, sticky nav border. */

(function () {
  'use strict';

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var KEY = 'bkr-theme';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  if (stored === 'dark' || stored === 'light') {
    apply(stored);
  } else {
    apply(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  var toggle = document.getElementById('theme');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  // Follow the OS only while the user hasn't chosen explicitly.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    var chosen = null;
    try { chosen = localStorage.getItem(KEY); } catch (err) {}
    if (!chosen) apply(e.matches ? 'dark' : 'light');
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    if (!burger || !menu) return;
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(menu.hidden);
    });

    // Close after picking a destination, or on Escape.
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    // A resize past the breakpoint re-shows the inline links; drop the panel.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    reveals.forEach(function (el, i) {
      // Small stagger so grouped items cascade rather than snap in together.
      el.style.transitionDelay = (Math.min(i % 6, 5) * 55) + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Sticky nav border ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var visible = new Set();

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // Highlight the topmost section currently in view.
      var activeId = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible.has(sections[i].id)) { activeId = sections[i].id; break; }
      }

      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + activeId);
      });
    }, { rootMargin: '-72px 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
