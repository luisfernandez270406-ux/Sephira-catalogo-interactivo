const productsContainer = document.querySelector("#productsContainer");

export const renderProducts = (products) => {
  productsContainer.innerHTML = products
    .map(
      (product) => `
            <article class="product-card">

                <div class="product-image-container">
                    <img 
                        src="${product.image}" 
                        alt="${product.title}"
                        class="product-image"
                    >
                </div>

                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3 class="product-title">
                        ${product.title}
                    </h3>

                    <p class="product-price">
                        $${product.price}
                    </p>

                    <button 
                        class="add-cart-button"
                        data-product-id="${product._id}"
                    >
                        Agregar al carrito
                    </button>

                </div>

            </article>
        `,
    )
    .join("");
};
export const renderCategories = (categories) => {
  const categorySelect = document.querySelector("#categorySelect");

  categorySelect.innerHTML = `
        <option value="all">Todas las categorías</option>
    `;

  categories.forEach((category) => {
    categorySelect.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;
  });
};
const cartContainer = document.querySelector("#cartContainer");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const cartSection = document.querySelector("#carrito");

export const renderCart = (cart) => {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    cartTotal.textContent = "$0.00";
    cartCount.classList.add("hidden");
    cartSection.hidden = true;
    return;
  }

  cartSection.hidden = false;
  cartCount.classList.remove("hidden");

  cartCount.textContent = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  cartContainer.innerHTML = cart
    .map(
      (product) => `
            <article class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="cart-item-image"
                >

                <div class="cart-item-info">

                    <h3>${product.title}</h3>

                    <p>
                        Precio: $${product.price}
                    </p>

                    <p>
                        Cantidad: ${product.quantity}
                    </p>

                    <button
                        class="remove-cart-button"
                        data-product-id="${product._id}"
                    >
                    Eliminar
                    </button>
                </div>
            </article>
        `,
    )
    .join("");

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  cartTotal.textContent = `$${total.toFixed(2)}`;
};
