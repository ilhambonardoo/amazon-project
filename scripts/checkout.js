import { cart, removeFromCart, updateDeliveyOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOption.js";
/**
 * GENERATE HTML TO JAVASCRIPT
 */
let cartSummaryHTML = " ";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("MMMM D, YYYY");

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${productId}">
    <div class="delivery-date">Delivery date : ${dateString}</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}" />
        <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
        <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-link"> Update </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}> Delete </span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>
        ${deliveryOptionHTML(matchingProduct, cartItem)}
      </div>
    </div>
    </div>
          `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("MMMM D, YYYY");

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    const priceString = deliveryOption.priceCents === 0 ? "FREE - Shipping" : `$${deliveryOption.priceCents / 100} - Shipping`;

    html += `<div class="delivery-option js-delivery-option data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
                <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">${priceString}</div>
                </div>
            </div>`;
  });

  return html;
}

/**
 * DELETE CART (INTERACTIVE)
 */
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

const today = dayjs();
const deliveryDate = today.add(8, "days");
console.log(deliveryDate.format("dddd, D MMMM YYYY"));

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  const { productId, deliveryOptionId } = element.dataset;
  updateDeliveyOption(productId, deliveryOptionId);
});
