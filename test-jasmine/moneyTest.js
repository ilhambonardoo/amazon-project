import { formatCurrency } from "../scripts/utils/money.js";

describe("test suite : formatCurrency", () => {
  it("convert dollars into cents", () => {
    expect(formatCurrency(2095)).toEqual("21.00");
  });

  it("Zero into ZERO", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("Rounds up to nearst cent", () => {
    expect(formatCurrency(2000.2)).toEqual("20.00");
  });
});
