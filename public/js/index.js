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


// make the icons change into our logo - could make it into a game for the first 6 months of the company every one who enters is entered into a database and a random winner is selected to get FREE FEED

const eggIcons = document.querySelectorAll('.eggIcon');

eggIcons.forEach(icon => {
  const originalClass = icon.className;

  icon.addEventListener('click', () => {
    // Replace the icon with the chick logo image
    icon.innerHTML = `<img src="/images/chicklogo.jpeg" alt="Young4Chick Logo" class="logo-image" />`;

    // After 1 second, bring back the original icon
    setTimeout(() => {
      icon.className = originalClass;
      icon.innerHTML = ''; // Clear image
    }, 1000);
  });
});
