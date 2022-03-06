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
      <button onClick="addToCart(${product.id})"> Add to cart </button>
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
      <a href="./product.html?id=${product.id}disc"><img src=${product.image_src} alt="${product.name}" /></a>
      <p class="product-name">${product.name}</p>
      <p class="product-discription">${product.description}</p>
      <div class="product-prices-and-discount">
      <strong>${product.price}</strong>
      <p>${product.discountPrice}</p>
      <img src="/pictures/heart-regular.svg" alt="" />
      <button onClick="addToCart(${product.id})"> Add to cart </button>
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


const cartItemsEl = document.querySelector('.cart-items');
const cartSubtotalEl = document.querySelector('.subtotal');
const totalItemsInCart = document.querySelector('.total-items-in-cart')

let product = [
  {
      "id": 1,
      "name": "Риза",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/CS_ClassicWhite_06_2048x2048.jpg",
      "price": 38.00,
      "discountPrice": 27.00
  },
  {
      "id": 2,
      "name": "Дънки",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/81KyIuYaH6L._UY550_.jpg",
      "price": 65.00,
      "discountPrice": 45.00
  },
  {
      "id": 3,
      "name": "Пола",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/867a31f0-1921-433a-84aa-466f16955dca.jpg",
      "price": 65.00,
      "discountPrice": 45.00
  },
  {
      "id": 4,
      "name": "Тениска",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/9088.png",
      "price": 65.00,
      "discountPrice": 45.00
  },
  {
      "id": 5,
      "name": "Яке",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/hmgoepprod.jpg",
      "price": 65.00,
      "discountPrice": 45.00
  },
  {
      "id": 6,
      "name": "Риза",
      "instock": 5,
      "description": "Описание",
      "image_src": "/pictures/products/types-of-shirts-for-men-bewakoof-blog-10-1610963791.jpg",
      "price": 65.00,
      "discountPrice": 45.00
  }
]
//Cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();




// Add to cart
function addToCart(id) {

  if (cart.some((item)=> item.id === id )) {
   changeNumberOfUnits('plus', id);
  } else {
    const item =  product.find((product) => product.id === id )
    cart.push({
      ...item,
      numberOfUnits: 1
    });
  }
 updateCart();
}

// update cart
function updateCart () {
  renderCartItems(); 
  renderSubTotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));

}

// calculate and render subtotal

 function renderSubTotal () {
   let totalPrice = 0,  totalItems = 0;

   cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
   })
   cartSubtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`

   totalItemsInCart.innerHTML = totalItems;
 }

// render cart items

function renderCartItems () {
  cartItemsEl.innerHTML = " ";

  cart.forEach((item)=> {
    cartItemsEl.innerHTML += `
    <div class="cart-item">
              <div class="item-info" onclick="removeItemFromCart(${item.id})">
                  <img src=${item.image_src} alt=${item.name}>
                  <h4>${item.name}</h4>
              </div>
              <div class="unit-price">
                  <small>$</small>${item.discountPrice}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
    `
  })
}


// remove item from cart
function removeItemFromCart (id) {
cart = cart.filter((item) => item.id !== id)

updateCart();
}

function changeNumberOfUnits(action, id) {
cart = cart.map((item) => {

  let oldNumOfUnits = item.numberOfUnits;
  if(item.id === id) {

    if ( action === "minus" && oldNumOfUnits > 1) {
      oldNumOfUnits--;
    } else if (action === "plus" && oldNumOfUnits < item.instock) {
      oldNumOfUnits++;
    }

  }
return {
  ...item,
  numberOfUnits : oldNumOfUnits
}
})

updateCart();
}



