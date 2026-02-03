// Bootstrap-like JavaScript - Minimal implementation for the statistics tutorial

(function() {
  'use strict';

  // Navbar toggle functionality
  function initNavbarTogglers() {
    document.addEventListener('click', function(event) {
      const toggler = event.target.closest('.navbar-toggler');
      if (!toggler) return;

      const target = toggler.getAttribute('data-bs-target');
      if (target) {
        const collapse = document.querySelector(target);
        if (collapse) {
          collapse.classList.toggle('show');
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarTogglers);
  } else {
    initNavbarTogglers();
  }
})();