import { allProducts } from "../script.js";
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const saveCartItems = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const addToCart = (productId) => {
  const product = allProducts.find((item) => item.id === productId);
  const existItem = cartItems.find((item) => item.id === productId);
  if (existItem) {
    existItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  saveCartItems(cartItems);
  displayItems();
  getQuantity();
};

const deleteItem = (itemId) => {
  const index = cartItems.findIndex((product) => product.id === itemId);
  cartItems.splice(index, 1);
  saveCartItems(cartItems);
  displayItems();
  getQuantity();
};

const getQuantity = () => {
  document.getElementById("quantity").innerHTML = cartItems.length
    ? cartItems.length
    : "";
};

const increaseQuantity = (itemId) => {
  const existItem = cartItems.find((item) => item.id === itemId);
  existItem.quantity += 1;
  saveCartItems(cartItems);
  displayItems();
  getQuantity();
};
const decreaseQuantity = (itemId) => {
  const existItem = cartItems.find((item) => item.id === itemId);
  if (existItem.quantity > 1) {
    existItem.quantity -= 1;
  } else {
    deleteItem(itemId);
  }
  saveCartItems(cartItems);
  displayItems();
  getQuantity();
};

window.addToCart = addToCart;
window.deleteItem = deleteItem;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

const cart = document.getElementById("cart");

console.log(cartItems);

const displayItems = () => {
  cart.innerHTML = "";
  cartItems.map((item) => {
    const row = document.createElement("div");
    row.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "border-b-2",
      "border-gray-200",
      "hover:bg-gray-100"
    );
    row.innerHTML = `
    <div class="w-full items-center md:p-3 p-1 grid grid-cols-12  ">
      <button
        class="md:w-5 md:h-5 h-3 w-3 rounded-full flex justify-center items-center bg-secondary text-white col-span-2"
        onclick="deleteItem(${item.id})"
      >
        <i class="fa-solid md:text-xs text-[5px] fa-x "></i>
      </button>
      <div class="flex flex-col justify-between items-start col-span-8 ">
        <div class="font-bold md:text-base text-[8px] text-start">${
          item.title
        }</div>
        <div class="flex flex-row items-center w-full md:text-xs text-[8px]">
          <p class="mr-2 md:text-base ">Price:</p>
          <div class="text-secondary">${item.quantity}</div> 
          <span class="mx-1">x</span>
          <div>${Math.round(item.price)}$</div>
          <i class="fa-solid fa-right-long mx-1 text-secondary"></i>
          <div class="font-semibold">${
            Math.round(item.price) * item.quantity
          }$</div>
        </div>
            
      </div>
      <div class="flex flex-col justify-center items-center md:gap-3 md:text-base text-[8px] col-span-2 ">
        <button onclick="increaseQuantity(${item.id})">
          <i class="fa-solid fa-square-caret-up hover:text-secondary"></i>
        </button>
        <button onclick="decreaseQuantity(${item.id})"
        >
          <i class="fa-solid fa-square-caret-down hover:text-secondary"></i>
        </button>
        
      </div>
      
    
    </div>`;
    cart.appendChild(row);
  });
};

displayItems();
getQuantity();
