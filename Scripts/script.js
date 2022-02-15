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
  if(favbtn.classList.contains("fav")) {
    favbtn.innerHTML = '<img class="red-heart-img" src="./icons/Heart-SG2001-transparent.png" alt="">'
    favbtn.classList.remove("fav");
    favbtn.classList.add("fav-no");
    sessionStorage.removeItem("item", true);
  } else  {
    sessionStorage.setItem("item", true);
  
    favbtn.innerHTML =
      '<img class="red-heart-img"src="../icons/video_image-Bz5ouo4Jn.jpg" alt="heart">';
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


