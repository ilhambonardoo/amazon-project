export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  console.log(cartQuantity);
  console.log(JSON.stringify(cart));

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}
