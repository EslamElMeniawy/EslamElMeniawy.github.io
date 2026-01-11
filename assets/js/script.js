// Main script for portfolio website

document.addEventListener('DOMContentLoaded', function() {
  // Set active navigation on page load
  const currentPage = getCurrentPage();
  setActiveNav(currentPage);

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
      });
    });
  }
});
