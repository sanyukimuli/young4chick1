// public/js/yfhub.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabBtn');
  const contents = document.querySelectorAll('.tabContent');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.style.display = 'none');

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      document.getElementById(target).style.display = 'block';
    });
  });
});
