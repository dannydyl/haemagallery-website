const aboutButton = document.querySelector('.about-button');
const aboutText = document.querySelector('.about-text');

aboutButton.addEventListener('click', () => {
  aboutText.classList.toggle('show');
});

const contactButton = document.querySelector('.contact-button');
const contactText = document.querySelector('.contact-text');

contactButton.addEventListener('click', () => {
  contactText.classList.toggle('show');
});

// Get the image container, images, and navigation links
const imageContainer = document.querySelector('.image-container');
const images = document.querySelectorAll('.images img');
const navLinks = document.querySelectorAll('.images-nav a');

// Set the initial slide index
let currentSlide = 0;

// Function to show the current slide
function showSlide() {
  // Hide all images
  images.forEach((image) => {
    image.style.display = 'none';
  });

  // Show the current slide
  images[currentSlide].style.display = 'block';

  // Update the active state of the navigation link
  navLinks.forEach((link, index) => {
    if (index === currentSlide) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Function to go to a specific slide
function goToSlide(index) {
  currentSlide = index;
  showSlide();
}

// Function to go to the next slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= images.length) {
    currentSlide = 0;
  }
  showSlide();
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = images.length - 1;
  }
  showSlide();
}

// Add click event listeners to the navigation links
navLinks.forEach((link, index) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    goToSlide(index);
  });
});

// Add click event listeners to the next and previous buttons
const nextButton = document.querySelector('.next-slide-button');
const prevButton = document.querySelector('.prev-slide-button');

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Show the initial slide
showSlide();