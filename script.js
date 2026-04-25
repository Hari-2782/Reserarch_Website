document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Menu Toggle ─────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  const navItems = document.querySelectorAll('.nav-links li a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // ── Scroll Spy ─────────────────────────────────────────────
  const sections = document.querySelectorAll('.scroll-section');

  const observerOptions = {
    root: null,
    rootMargin: '-50px 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ── Search Bar ─────────────────────────────────────────────
  const searchToggle = document.getElementById('search-toggle');
  const searchBox    = document.getElementById('search-box');
  const searchInput  = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Define searchable items: { label, target (anchor id), keywords }
  const searchIndex = [
    { label: 'Home',            target: '#home',          keywords: 'home hero road safety ai system' },
    { label: 'Domain Overview', target: '#domain',        keywords: 'domain literature survey research gap problem objectives methodology' },
    { label: 'Milestones',      target: '#milestones',    keywords: 'milestones proposal progress presentation viva final assessment demonstration' },
    { label: 'Documents',       target: '#documents',     keywords: 'documents charter proposal checklist individual report final pdf download' },
    { label: 'Presentations',   target: '#presentations', keywords: 'presentations slides proposal progress final view' },
    { label: 'About Us / Team', target: '#about',         keywords: 'about team harisanth mithuran piranes piranavan lakmini kanagasabai supervisor' },
    { label: 'Contact',         target: '#contact',       keywords: 'contact email phone sliit location form message' },
    { label: 'Pothole Detection',   target: '#domain', keywords: 'pothole detection yolov8 accuracy kalman sri lanka' },
    { label: 'Risk Analysis',       target: '#domain', keywords: 'risk hazard anomaly detection noise physics' },
    { label: 'Violation Detection', target: '#domain', keywords: 'violation lane speed unet optical flow' },
    { label: 'Driver Behavior',     target: '#domain', keywords: 'driver behavior alignment carla simulator f1 score' },
  ];

  function renderSearchResults(query) {
    searchResults.innerHTML = '';
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const matches = searchIndex.filter(item =>
      item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
    );
    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found.</div>';
      return;
    }
    matches.slice(0, 6).forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.innerHTML = `
        <span class="result-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
        <span>${item.label}</span>`;
      div.addEventListener('click', () => {
        document.querySelector(item.target).scrollIntoView({ behavior: 'smooth' });
        searchBox.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
      });
      searchResults.appendChild(div);
    });
  }

  if (searchToggle && searchBox && searchInput) {
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.toggle('open');
      if (searchBox.classList.contains('open')) searchInput.focus();
    });

    searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && e.target !== searchToggle) {
        searchBox.classList.remove('open');
      }
    });
  }

  // ── Milestone Accordion ────────────────────────────────────
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Close all
      accordionHeaders.forEach(h => {
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        header.setAttribute('aria-expanded', 'true');
        body.classList.add('open');
      }
    });
  });
});
