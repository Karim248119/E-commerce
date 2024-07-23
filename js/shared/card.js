import { addToCart } from "./cart.js";

export const card = (index, product) => {
  return `
            <div key=${index} class="lg:h-[75vh] h-[50vh] w-full  flex justify-center items-center ">
                <div class="w-[100%] h-[100%] bg-white shadow-custom rounded">
                  <div class="lg:h-80 h-[55%] w-full  ">
                    <img
                      src=${product.images[0]}
                      alt=""
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    class="info flex flex-1 lg:p-5   flex-col justify-center items-center text-center lg:gap-2 gap-[2px]"
                  >
                    <h2 class="capitalize font-bold lg:text-lg lg:h-10 h-8 text-xs">${product.title}</h2>
                    <p class="lg:text-sm text-[8px] lg:h-20 h-14 overflow-hidden">
                      ${product.description}
                    </p>
                    <div
                      class="lg:text-xs text-[8px] self-start flex gap-1 justify-center items-center"
                    >
                      <i class="fa-solid fa-star text-yellow-600"></i>
                      <p class="text-secondary p-1 bg-secondary/10 font-bold">
                        ${product.rating}
                      </p>
                    </div>
                    <div class="w-full flex justify-between lg:text-base text-[8px]">
                      <p>$${product.price}</p>
                      <button class="bg-secondary text-white lg:p-2 p-1 py-[2px] lg:py-1 lg:rounded rounded-sm hover:bg-black"
                      onclick='addToCart(${product.id})'
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          
          `;
};
