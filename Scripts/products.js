const productID = new URLSearchParams(window.location.search).get("id");
const prodContainer = document.querySelector(".product-container");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/products/" + productID);
  const post = await res.json();

  const templet = `<div class="most-selled-item">
<img src=${post.image_src} alt="" />
<div class="details"> 
  <p class="product-name">${post.name}</p>
  <p class="product-discription">${post.description}</p>
  <strong class="price">${post.price} лв</strong>
  <div class="button">
  <button><img src="https://previews.123rf.com/images/asmati/asmati1706/asmati170605898/80929972-signe-de-panier-shopping-vecteur-blanc-avec-ic%C3%B4ne-douce-sur-fond-transparent-.jpg" alt="" /> Добави в количка</button>
  </div>
  <button class="order-button"><img src="" alt="" /> Поръчай по телефона</button>
</div>
<div class="more-photos"> 
<img src=${post.image_src} alt="">
<img src=${post.image_src} alt="">
<img src=${post.image_src}  alt="">
 </div>
</div>

`;

  prodContainer.innerHTML = templet;
};

window.addEventListener("DOMContentLoaded", () => renderDetails());
