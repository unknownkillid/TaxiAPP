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

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".collapsible-header");
  const contents = document.querySelectorAll(".collapsible-content");
  const problemContainer = document.querySelectorAll(".problemContainer");

  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      contents.forEach((content, contentIndex) => {
        if (contentIndex !== index) {
          content.style.maxHeight = null;
          content.classList.remove("active");
        }
      });

      const content = contents[index];
      if (content.classList.contains("active")) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
      content.classList.toggle("active");
    });
  });
});


function changeLanguage() {
  const language = document.getElementById("language").value;

  const urls = {
    "GE": "index.html",
    "EN": "index-EN.html",
    "RU": "index-RU.html"
  };

  if (urls[language]) {
    window.location.href = urls[language];
    console.log(language);
    
  }
}



const burgerMenuContainer = document.getElementById('burgerMenuContainer');
const burgerMenuButton = document.getElementById('burgerBtn');
const burgerXmark = document.getElementById('xmark');
const registerBurger = document.getElementById('registerBurger')

burgerMenuButton.addEventListener('click', () => {
  burgerMenuContainer.classList.add('burger-menuIn');
  header.classList.add("headerHideShow");
  document.body.style.overflow = 'hidden';
})

burgerXmark.addEventListener('click', () => {
  burgerMenuContainer.classList.remove('burger-menuIn');
  document.body.style.overflow = 'scroll';
  header.classList.remove("headerHideShow");

})

registerBurger.addEventListener('click', () => {
  burgerMenuContainer.classList.remove('burger-menuIn');
  document.body.style.overflow = 'scroll';
})

document.querySelectorAll('.clicable-linkBurger').forEach(clickable => {
  clickable.addEventListener('click', () => {
    burgerMenuContainer.classList.remove('burger-menuIn');
    document.body.style.overflow = 'scroll';
    secondHeader.classList.add('bgColorWhenMove')
  })
})

function changeLanguageBurger() {
  const language = document.getElementById("languageBurger").value;

  const urls = {
    "GE": "index.html",
    "EN": "index-EN.html",
    "RU": "index-RU.html"
  };

  if (urls[language]) {
    window.location.href = urls[language];
  }
}