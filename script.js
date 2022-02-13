var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
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
}

function save() {
  localStorage.setItem("item", true);
  let favbtn = document.getElementById("like-button");
  favbtn.innerHTML = "Любим";
  favbtn.style.backgroundColor = "blue";
  console.log("Favorite button was clicked");
} // end save function

window.onload = function () {
  let favorite = document.getElementById("like-button");
  if (window.localStorage) {
    let storage = window.localStorage;
    if (storage.getItem("item") == "true") {
      favorite.innerHTML = "Любим";
    }
  }
  favorite.style.backgroundColor = "red";
  favorite.style.color = "white";
};   //End slideshow script

function save() {
  localStorage.setItem("item", true);
  let favbtn = document.getElementById("like-button");
  favbtn.innerHTML = "Любим";
  favbtn.style.backgroundColor = "blue";
  console.log("Favorite button was clicked");
} // end save function

window.onload = function () {
  let favorite = document.getElementById("like-button");
  if (window.localStorage) {
    let storage = window.localStorage;
    if (storage.getItem("item") == "true") {
      favorite.innerHTML = "Любим";
    }
  }
  favorite.style.backgroundColor = "red";
  favorite.style.color = "white";
};

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
  }
}); // end event listener