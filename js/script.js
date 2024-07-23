import { handleRemoteRequest } from "./shared/api.js";
import { card } from "./shared/card.js";

const drawer = document.getElementById("drawer");
const drawerBtn = document.getElementById("drawer-btn");

drawerBtn.addEventListener("click", () => {
  if (drawer.classList.contains("right-0")) {
    drawer.classList.remove("right-0");
    drawer.classList.add("lg:-right-1/4", "md:-right-1/3", "-right-3/4");
  } else {
    drawer.classList.remove("lg:-right-1/4", "md:-right-1/3", "-right-3/4");
    drawer.classList.add("right-0");
  }
});

const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");

export let allProducts = [];

export const getAllProducts = () => {
  productsContainer.innerHTML = "";
  handleRemoteRequest(
    "products",
    function (data) {
      const products = data.products;
      allProducts = products;
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });
    },
    function (error) {
      console.log(error);
    },
    function () {
      loading.classList.remove("hidden");
      products.classList.add("hidden");
    },
    function () {
      loading.classList.add("hidden");
      products.classList.remove("hidden");
    }
  );
};
getAllProducts();

document.getElementById("all").addEventListener("click", getAllProducts);

const getProductByCategory = (categoryName) => {
  productsContainer.innerHTML = "";
  handleRemoteRequest(
    `products/category/${categoryName}`,
    function (data) {
      const products = data.products;
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });
    },
    function (error) {
      console.log(error);
    },
    function () {
      loading.classList.remove("hidden");
      products.classList.add("hidden");
    },
    function () {
      loading.classList.add("hidden");
      products.classList.remove("hidden");
    }
  );
};
window.getProductByCategory = getProductByCategory;

const sideMenu = document.querySelector(".side-menu ");

handleRemoteRequest(
  "products/category-list",
  function (data) {
    data.forEach((item, index) => {
      const cat = document.createElement("div");
      cat.innerHTML = `<button onclick="getProductByCategory('${item}')" class="hover:text-secondary">${item}</button>`;
      sideMenu.appendChild(cat);
    });
  },
  function (error) {
    console.log(error);
  },
  function () {
    console.log("start loading");
  },
  function () {
    console.log("stop loading");
  }
);

const searchInput = document.querySelector(".search");
const searchProduct = (query) => {
  productsContainer.innerHTML = "";
  handleRemoteRequest(
    `products/search?q=${query}`,
    function (data) {
      const products = data.products;
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });
    },
    function (error) {
      console.log(error);
    },
    function () {
      loading.classList.remove("hidden");
      products.classList.add("hidden");
    },
    function () {
      loading.classList.add("hidden");
      products.classList.remove("hidden");
    }
  );
};

searchInput.addEventListener("keyup", () => {
  const query = searchInput.value;
  searchProduct(query);
});
