import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
describe("test suite : RenderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
  const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";
  const productName2 = "2 Slot Toaster - Black";

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-header-container"></div>`;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          productName: "2 Slot Toaster - Black",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  it("tampilan cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain("Quantity: 2");
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain("Quantity: 1");
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual(productName1);
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual(productName2);
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual("$11.00");
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual("$19.00");
  });

  it("test menghapus produk (delete)", () => {
    expect(document.querySelector(`.js-delete-link-${productId1}`).click());
    expect(document.querySelectorAll(`.js-cart-item-container`).length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
});
