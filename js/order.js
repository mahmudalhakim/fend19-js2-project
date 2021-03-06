$(document).ready(function() {
  const shoppingCart = shopLib.getShoppingCart();
  const inventory = shopLib.getInventory();

  let subTotal = 0;
  let itemsCountTotal = 0;
  let orderList = document.querySelector(".order-list");

  Object.keys(shoppingCart).forEach(itemID => {
    const item = inventory.find(item => item.id === Number(itemID));
    const itemCount = shoppingCart[itemID];
    const itemTotal = item.price.value * itemCount;

    subTotal += itemTotal;
    itemsCountTotal += itemCount;
    orderList.innerHTML += `
      <tr>
        <td class="item-name">
          <span>
            <img class="product-cover-small" src="img/product/product-${item.id}.jpg" alt="${item.title}" />
          </span>
          ${item.title}</td>
        <td class="item-qty">${itemCount}</td>
        <td class="item-price">${item.price.value} kr</td>
        <td class="item-total">${itemTotal.toFixed(2)} kr</td>
      </tr>`;
  });

  subTotal = subTotal.toFixed(2);

  orderList.innerHTML += `
    <tr class="font-bold">
      <td>Totalt:</td>
      <td class="products-amount"></td>
      <td></td>
      <td class="item-total" >${subTotal} kr</td>
    </tr >
    </tbody>
    `;

  document.querySelector(".totalPrice").textContent = subTotal + " kr";
  document.querySelector(".products-amount").innerHTML = itemsCountTotal;
  document.querySelector(".dateToday").textContent = new Date().toLocaleString();

  const myBtn2 = document.querySelector(".goback-Btn");
  myBtn2.addEventListener("click", function() {
    location.href = "/index.html";
  });

  const confirmButton = document.querySelector(".confirm-order-button");
  if (itemsCountTotal === 0) {
    confirmButton.setAttribute("disabled", "");
  } else {
    confirmButton.removeAttribute("disabled");
  }

  confirmButton.addEventListener("click", onOrderConfirmedClick);
});

function onOrderConfirmedClick(event) {
  if (confirm("Vill du bekräfta din order?")) {
    shopLib.clearShoppingCart();
    location.href = "/index.html";
  } else {
    event.preventDefault();
  }
}
