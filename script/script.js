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


let lastScrollTop = 0;
const header = document.getElementById("mainHeader");
const secondHeader = document.getElementById("secondHeader");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 150 && scrollTop > lastScrollTop) {
    header.classList.add("headerHideShow");
    secondHeader.classList.add('bgColorWhenMove')
  } else {
    header.classList.remove("headerHideShow");
  }

  if (scrollTop === 0) {
    secondHeader.classList.remove('bgColorWhenMove')
  }

  lastScrollTop = scrollTop;
});

//Slider Move Function

const registerForm = document.getElementById('registerFormID')
const courierForm = document.getElementById('courierFormID')

function sliderMove() {
  const slider = document.getElementById('slider');
  const taxi = document.getElementById('taxiChoose');
  const courier = document.getElementById('courierChoose');
  let slideBool = false;
  taxi.classList.add('colorChangeOnChoose')

  courier.addEventListener('click', () => {
    if (!slideBool) {
      slider.classList.add('sliderRight');
      taxi.classList.remove('colorChangeOnChoose')
      courier.classList.add('colorChangeOnChoose')
      courierForm.classList.add('courierFormShow')
      registerForm.classList.add('registerFormNone')
      slideBool = true;
    }
  });

  taxi.addEventListener('click', () => {
    if (slideBool) {
      slider.classList.remove('sliderRight');
      courier.classList.remove('colorChangeOnChoose')
      taxi.classList.add('colorChangeOnChoose')
      courierForm.classList.remove('courierFormShow')
      registerForm.classList.remove('registerFormNone')

      slideBool = false;
    }
  });
}

sliderMove();