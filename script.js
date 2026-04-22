
// 🔹 KLOCKA
function updateClock() {
  const now = new Date();

  const timeString = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ]
    .map(n => n.toString().padStart(2, '0'))
    .join(':');

  const clock = document.getElementById('clock');
  if (clock) {
    clock.textContent = timeString;
    clock.setAttribute('datetime', timeString);
  }
}

// 🔹 DATUM
function updateDate() {
  const now = new Date();

  const year = now.getFullYear().toString().slice(-2); // ÅÅ
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // MM
  const day = now.getDate().toString().padStart(2, '0'); // DD

  const dateString = `${year}${month}${day}`;

  const date = document.getElementById('date');
  if (date) {
    date.textContent = dateString;
    date.setAttribute('datetime', now.toISOString());
  }
}

// 🔹 Starta
updateClock();
updateDate();

// 🔹 Uppdatera tid varje sekund
setInterval(updateClock, 1000);

// 🔹 Uppdatera datum varje minut (räcker)
setInterval(updateDate, 60000);

// 🔹 COPY EMAIL
function setupCopyButton() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.querySelector('.email-link');
  const email = 'erik@kesten.se';
  
  function performCopy() {
    navigator.clipboard.writeText(email).then(function() {
      // Visual feedback
      copyBtn.classList.add('copied');
      const originalSvg = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span style="font-size: 14px; font-weight: 600;">✓</span>';
      
      setTimeout(function() {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalSvg;
      }, 2000);
    }).catch(function(err) {
      console.error('Failed to copy:', err);
    });
  }
  
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      performCopy();
    });
  }
  
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      performCopy();
    });
  }
}

setupCopyButton();





// Hämta alla klickbara bilder
const images = document.querySelectorAll('.clickable img');
const hoverImages = document.querySelectorAll('img[data-hover]');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const btnNext = document.querySelector('.lightbox-next');
const btnPrev = document.querySelector('.lightbox-prev');
const btnClose = document.querySelector('.lightbox-close');
const lightboxCaption = document.querySelector('.lightbox-caption');

let currentIndex = 0;
let openedAt = 0;

// 🔹 Öppna lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();

    if (lightbox) {
      lightbox.classList.add('active');
    }
    document.body.classList.add('lightbox-open');

    openedAt = Date.now();
  });
});

// 🔹 Hover-swap
function setupHoverSwap() {
  hoverImages.forEach((img) => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;
    if (!hoverSrc) return;

    const preload = new Image();
    preload.src = hoverSrc;

    img.addEventListener('mouseenter', () => {
      img.src = hoverSrc;
    });

    img.addEventListener('mouseleave', () => {
      img.src = originalSrc;
    });

    img.addEventListener('touchstart', () => {
      img.src = hoverSrc;
    });

    img.addEventListener('touchend', () => {
      img.src = originalSrc;
    });
  });
}

setupHoverSwap();

// 🔹 Stäng lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.classList.remove('lightbox-open');
}

// 🔹 Nästa bild
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

// 🔹 Föregående bild
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

// 🔹 Knappar
if (btnNext && btnPrev && btnClose && lightbox) {
  btnNext.addEventListener('click', nextImage);
  btnPrev.addEventListener('click', prevImage);
  btnClose.addEventListener('click', closeLightbox);

  // 🔹 Klick utanför bild
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// 🔹 Tangentbord
if (lightbox) {
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// 🔹 Scroll / swipe för att stänga (med delay så det inte stängs direkt)
function canClose() {
  return Date.now() - openedAt > 300;
}

window.addEventListener('wheel', () => {
  if (lightbox && lightbox.classList.contains('active') && canClose()) {
    closeLightbox();
  }
});

window.addEventListener('touchmove', () => {
  if (lightbox && lightbox.classList.contains('active') && canClose()) {
    closeLightbox();
  }
});

const track = document.querySelector('.track');
const row = document.querySelector('.row');

if (track && row) {
  // duplicera tills det täcker bredden
  while (track.scrollWidth < window.innerWidth * 2) {
    const clone = row.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

function showImage() {
  const img = images[currentIndex];
  if (!img || !lightboxImg || !lightboxCaption) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';

  // Hämta caption från alt (eller data-attribut)
  lightboxCaption.textContent = img.alt || '';
}


