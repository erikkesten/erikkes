const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const images = document.querySelectorAll('.gallery-image');
let currentIndex = 0;

// Open modal when image is clicked
images.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
        currentIndex = index;
    });
});

// Close modal
const closeModal = document.querySelector('.close');
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Next/previous controls
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.onclick = function() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}

prev.onclick = function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}

// Close the modal when clicking outside of the image
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
