// ============================================================
// DREAM EVENT MANAGEMENT - MOBILE & INTERACTIVE ENHANCEMENTS
// Option 3: Horizontal Scroll Nav & Accordion Footer Handlers
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Horizontal Scroll Nav: Highlight Active Link & Scroll into view
  const currentPath = window.location.pathname.toLowerCase();
  const scrollLinks = document.querySelectorAll('.mobile-scroll-nav .scroll-link');
  const scrollContainer = document.querySelector('.mobile-scroll-nav');

  scrollLinks.forEach(function (link) {
    const linkPath = (link.getAttribute('href') || '').toLowerCase();
    const dataPath = (link.getAttribute('data-path') || '').toLowerCase();

    const isMatch =
      (currentPath === '/' && (linkPath === '/' || dataPath === '/')) ||
      (currentPath !== '/' && linkPath !== '/' && (currentPath.startsWith(linkPath) || currentPath.startsWith(dataPath)));

    if (isMatch) {
      link.classList.add('active');
      if (scrollContainer) {
        // Smoothly center the active item in the horizontal scroll container
        setTimeout(function () {
          const containerWidth = scrollContainer.offsetWidth;
          const linkLeft = link.offsetLeft;
          const linkWidth = link.offsetWidth;
          scrollContainer.scrollTo({
            left: linkLeft - containerWidth / 2 + linkWidth / 2,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  });

  // 2. Mobile Accordion Footer (Option 3)
  const accordionTitles = document.querySelectorAll('.footer-accordion-title');

  accordionTitles.forEach(function (title) {
    title.addEventListener('click', function () {
      // Only operate in mobile viewport (< 768px)
      if (window.innerWidth >= 768) return;

      const col = this.closest('.footer-col');
      if (!col) return;

      const isOpen = col.classList.contains('is-open');

      // Toggle current column
      if (isOpen) {
        col.classList.remove('is-open');
        this.setAttribute('aria-expanded', 'false');
      } else {
        col.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility for accordion
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        title.click();
      }
    });
  });

  // Open first accordion section by default on mobile for visual cue
  if (window.innerWidth < 768) {
    const firstCol = document.querySelector('.footer-col');
    if (firstCol) {
      firstCol.classList.add('is-open');
    }
  }

  // 3. Close flash message alerts on click
  const closeAlerts = document.querySelectorAll('.alert .close');
  closeAlerts.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const alert = this.closest('.alert');
      if (alert) {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(function () {
          alert.remove();
        }, 300);
      }
    });
  });
});
