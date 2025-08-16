import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite : formatCurrency", () => {
  it("mengkonversi dari dollar ke sen", () => {
    expect(formatCurrency(2095)).toEqual("21.00");
  });

  it("bekerja dengan 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Rounds up to nearst cent/membulatkan ke sen yang terdekat ", () => {
    expect(formatCurrency(2000.2)).toEqual("20.00");
  });

  it("Memeriksa apakah nomer yang ada di priceCents itu negatif", () => {
    expect(formatCurrency(-200)).toEqual("-2.00");
  });
});
