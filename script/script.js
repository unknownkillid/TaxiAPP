const images = [];
for (let i = 1; i <= 3; i++) {
    images[i] = new Image();
    images[i].src = `./assets/carousel/${i}.jpg`; 
}

const carouselContainer = document.getElementById('carouselContainer');
let currentImageIndex = 1;

function carousel() {
    carouselContainer.style.backgroundImage = `url(./assets/carousel/${currentImageIndex}.jpg)`;
    currentImageIndex++;
    if (currentImageIndex > 3) {
        currentImageIndex = 1;
    }
}

setInterval(carousel, 5000);
carousel();

const carSound = new Audio('./assets/carSound.mp3');

document.getElementById('arrowBtn').addEventListener('click', () => {
    carSound.duration = 0;
    carSound.volume = 0.2
    carSound.play();
})