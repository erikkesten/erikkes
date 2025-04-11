const hoverContainers = document.querySelectorAll('.grid-item'); // Target ALL containers
const customCursor = document.querySelector('.custom-cursor');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

// Loop through all hover containers and add event listeners
hoverContainers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '1';
    customCursor.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale up
  });

  container.addEventListener('mouseleave', () => {
    customCursor.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale down
  });
});









const hamburger = document.querySelector('.hamburger a.main-nav-toggle');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', (e) => {
  e.preventDefault();
  hamburger.classList.toggle('active-menu');
  drawer.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active-menu');
  drawer.classList.remove('active');
  overlay.classList.remove('active');
});
