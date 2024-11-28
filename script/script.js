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


const resContaienr = document.getElementById('response')
async function handleFormSubmit(event, endpoint, dataWrapperKey) {
  event.preventDefault();

  const formData = new FormData(event.target);
  let data = Object.fromEntries(formData.entries());

  data = { [dataWrapperKey]: data };

  const errElement = document.querySelector(".responseh1");
  errElement.textContent = "";

  try {
    const response = await fetch(`http://localhost:3000/${endpoint}/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    console.log("Response:", result);

    let message = "";
    if (result && typeof result === "object" && result.error) {
      message = result.error;
    } else if (typeof result === "string") {
      if (result.includes("already registered")) {
        message = `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} already registered`;
      } else if (result.includes("saved successfully")) {
        message = `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} registration saved successfully`;
      } else {
        message = result;
      }
    } else if (result.success) {
      message = `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} registered successfully`;
    }

    errElement.textContent = message;

    if (message.toLowerCase().includes("success")) {
      event.target.reset();
    }
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "An unexpected error occurred";
    if (error.message.includes("NetworkError")) {
      errorMessage = "Network error: Unable to reach the server";
    } else if (error.message.includes("already")) {
      errorMessage = `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} already registered`;
    } else if (error.message.includes('"phoneNumber" with value')) {
      errorMessage = "Phone number must be 9 digits";
    } else if (error.message) {
      errorMessage = error.message;
    }

    errElement.textContent = errorMessage;
  }
}

document.querySelectorAll(".registerForm").forEach(registerForms => {
  registerForms.addEventListener("submit", function (event) {
    handleFormSubmit(event, "taxi", "taxi");
    resContaienr.classList.add('resContainerShow')
  });
})

document.querySelectorAll(".courierForm").forEach(courierRegForm => {
  courierRegForm.addEventListener("submit", function (event) {
    handleFormSubmit(event, "courier", "courier");
    resContaienr.classList.add('resContainerShow')
  });
})



const resButton = document.querySelectorAll('.resbutton')

resButton.forEach(resButtonClicked => {
  resButtonClicked.addEventListener('click', () => {
    resContaienr.classList.remove('resContainerShow')
  })
})

const licenseInput = document.getElementById('licNumber');
const licenseLabel = document.getElementById('licLabel');

const taxiRegisterButton = document.getElementById('taxiRegisterButton')

taxiRegisterButton.addEventListener('click', () => {
  if (!licenseInput.validity.valid) {
    licenseLabel.classList.add('validationReds');
    licenseLabel.classList.remove('validGreen');

  } else {
    licenseLabel.classList.add('validGreen');
    licenseLabel.classList.remove('validationReds');
  }
});