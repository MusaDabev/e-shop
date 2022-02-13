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
}  // end slideshow script



function save() {
  sessionStorage.setItem("item", true);
  let favbtn = document.getElementById("like-button");
  favbtn.innerHTML = "<img class=\"red-heart-img\"src=\"./icons/video_image-Bz5ouo4Jn.jpg\" alt=\"heart\">";
  favbtn.style.backgroundColor = "white";
  console.log("Favorite button was clicked");
} // end save function

window.onload = function () {
  let favorite = document.getElementById("like-button");
  if (window.sessionStorage) {
    let storage = window.sessionStorage;
    if (storage.getItem("item") == "true") {
      favorite.innerHTML = "<img class=\"red-heart-img\" src=\"./icons/Heart-SG2001-transparent.png\" alt=\"\">";
    }
  }
  favorite.style.backgroundColor = "white";
};


