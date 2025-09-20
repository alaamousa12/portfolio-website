// js/components/navigation.js
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('header');

  // Toggle mobile menu
  function toggleMenu() {
    if (!navMenu) return;
    navMenu.classList.toggle('active');

    const icon = hamburger.querySelector('i');
    const opened = navMenu.classList.contains('active');

    if (icon) icon.className = opened ? 'fas fa-times' : 'fas fa-bars';
    hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  }

  // Close menu (used on link click)
  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('active');
    const icon = hamburger.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // Change header look on scroll
  function scrollHeader() {
    if (!header) return;
    if (window.scrollY >= 80) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }

  // Highlight active link based on section in view
  function activeLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - (header ? header.offsetHeight + 10 : 60);
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const selector = `.nav-menu a[href="#${sectionId}"]`;
      const link = document.querySelector(selector);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (link) link.classList.add('active-link');
      } else {
        if (link) link.classList.remove('active-link');
      }
    });
  }

  // Close menu when window is resized to desktop
  function onResize() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  }

  // Attach events
  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  navLinks.forEach((lnk) => lnk.addEventListener('click', closeMenu));
  window.addEventListener('scroll', scrollHeader);
  window.addEventListener('scroll', activeLink);
  window.addEventListener('resize', onResize);

  // Run once on load
  scrollHeader();
  activeLink();
});
