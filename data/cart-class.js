class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;

    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          productName: "2 Slot Toaster - Black",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  /**
   * ADD TO CART
   */

  addToCart(productId, productName, quantity = 1) {
    let matchingItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (!matchingItem) {
      this.cartItems.push({
        productId: productId,
        productName: productName,
        quantity: quantity,
      });
    } else {
      matchingItem.quantity += quantity;
    }
    this.saveToStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

cart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d", "Intermediate Size Basketball", 2);

console.log(cart);
console.log(businessCart);
