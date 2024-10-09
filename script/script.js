const carouselContainer = document.getElementById('carouselContainer');
let currentImageIndex = 1; 

function carousel() {
    carouselContainer.style.backgroundImage = `url(./assets/carousel/${currentImageIndex}.jpg)`;
    currentImageIndex++;

    if (currentImageIndex > 3) {
        currentImageIndex = 1;
    }
}

setInterval(carousel, 7000);
carousel();
