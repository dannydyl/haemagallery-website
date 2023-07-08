const aboutButton = document.querySelector('.about-button');
const aboutText = document.querySelector('.about-text');
const imgBright = document.querySelector('.images');

const contactButton = document.querySelector('.contact-button');
const contactText = document.querySelector('.contact-text');

let isPopUpVisible = false;

aboutButton.addEventListener('click', () => {
  if(!isPopUpVisible){
    aboutText.classList.toggle('show');
    imgBright.classList.toggle('show');
    isPopUpVisible = true;
  }
});

contactButton.addEventListener('click', () => {
  if(!isPopUpVisible){
    contactText.classList.toggle('show');
    imgBright.classList.toggle('show');
    isPopUpVisible = true;
  }
});

document.body.addEventListener('click', (event) => {
  if (!aboutButton.contains(event.target) && !contactButton.contains(event.target)) {
    aboutText.classList.remove('show');
    contactText.classList.remove('show');
    imgBright.classList.remove('show');
    isPopUpVisible = false;
  }
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

  setTimeout(() => {
    imageContainer.classList.remove('slide-animation'); // Remove CSS class after the animation
  }, 600); // Adjust the timeout to match the transition duration
  
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
  imageContainer.classList.add('slide-animation');
  setTimeout(() => {
    showSlide();
    imageContainer.classList.remove('slide-animation');
  }, 10);
  showSlide();
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = images.length - 1;
  }
  imageContainer.classList.add('slide-animation');
  setTimeout(() => {
    showSlide();
    imageContainer.classList.remove('slide-animation');
  }, 10);
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

