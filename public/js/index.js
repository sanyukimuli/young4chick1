const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('links');

menuBtn.addEventListener('click', (e) => {
    navLinks.classList.toggle('open');
    e.stopPropagation(); //stops it from closing automatically
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  // If the nav is open AND the click is outside nav AND not the menu button
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuBtn) {
    navLinks.classList.remove('open');
  }
});