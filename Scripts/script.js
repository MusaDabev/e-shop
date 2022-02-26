let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
} // end slideshow script

function save() {
  let favbtn = document.getElementById("like-button");
  if (favbtn.classList.contains("fav")) {
    favbtn.innerHTML =
      '<img class="red-heart-img" src="../icons/Heart-SG2001-transparent.png" alt="">';
    favbtn.classList.remove("fav");
    favbtn.classList.add("fav-no");
    sessionStorage.removeItem("item", true);
  } else {
    sessionStorage.setItem("item", true);

    favbtn.innerHTML =
      '<img class="red-heart-img" src="../icons/video_image-Bz5ouo4Jn.jpg" alt="heart">';
    favbtn.style.backgroundColor = "white";
    favbtn.classList.add("fav");
    favbtn.classList.remove("fav-no");
  }
} // end save function

window.onload = function () {
  let favorite = document.getElementById("like-button");

  if (window.sessionStorage) {
    let storage = window.sessionStorage;
    if (storage.getItem("item") == "true") {
      favorite.innerHTML =
        '<img class="red-heart-img"src="../icons/video_image-Bz5ouo4Jn.jpg" alt="heart">';
    }
  }
  favorite.style.backgroundColor = "white";
};

const container = document.querySelector(".most-selled-container");

const renderProducts = async () => {
  let uri = "http://localhost:3000/products"; // if I want to sort by price "?_sort=price"

  const res = await fetch(uri);
  const products = await res.json();

  let templet = "";

  products.forEach((product) => {
    templet += `<div class="most-selled-item">
    <a href="./product.html?id=${product.id}"><img src=${product.image_src} alt="" /></a>
    
    <p class="product-name">${product.name}</p>
    <p class="product-discription">${product.description}</p>
    <div class="product-prices-and-discount">
      <strong>${product.price}</strong>
      <img src="/pictures/heart-regular.svg" alt="" />
    </div>
    
  </div>`;
  });
  container.innerHTML = templet;
};

window.addEventListener("DOMContentLoaded", () => renderProducts());

// ===========================================================================

const promotionsContainer = document.querySelector(".promotions-container");

const renderPromotionProducts = async () => {
  let uri = "http://localhost:3000/discountProducts"; // if I want to sort by price "?_sort=price"

  const res = await fetch(uri);
  const discountProduct = await res.json();

  let templet = "";

  discountProduct.forEach((product) => {
    templet += `<div class="most-selled-item">
      <a href="./product.html?id=${product.id}disc"><img src=${product.image_src} alt="" /></a>
      <p class="product-name">${product.name}</p>
      <p class="product-discription">${product.description}</p>
      <div class="product-prices-and-discount">
      <strong>${product.price}</strong>
      <p>${product.discountPrice}</p>
      <img src="/pictures/heart-regular.svg" alt="" />
    </div>
    
  </div>`;
  });
  promotionsContainer.innerHTML = templet;
};


// Burger button

const burger = document.querySelector('.burger');
const burgerNav = document.querySelector('.burger-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  burgerNav.classList.toggle('open');
})

window.addEventListener("DOMContentLoaded", () => renderPromotionProducts());
