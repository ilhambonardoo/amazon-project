import { formatCurrency } from "../scripts/utils/money.js";

console.log("Dibulatkan");
console.log("convert dari dollar ke cents");
if (formatCurrency(2095) === "21.00") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatCurrency(2000.7) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}

let test = formatCurrency(2095);
console.log(test);

test = formatCurrency(2000.9);
console.log(test);
