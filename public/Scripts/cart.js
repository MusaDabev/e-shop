
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
     let totalPrice = 0, totalItems = 0;
  
     cart.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
     })
     cartSubtotalEl.innerHTML = `Subtotal (${totalItems} items): $ ${totalPrice.toFixed(2)}`
  
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
  
  renderCartItems ();

  
  
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
  
  