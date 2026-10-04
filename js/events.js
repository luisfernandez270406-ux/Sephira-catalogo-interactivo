import { state } from "./state.js";
import { renderProducts, renderCart } from "./ui.js";

const searchForm = document.querySelector("#headerSearchForm");
const searchInput = document.querySelector("#headerSearchInput");
const categorySelect = document.querySelector("#categorySelect");
const productsContainer = document.querySelector("#productsContainer");
const cartButton = document.querySelector("#cartButton");
const cartSection = document.querySelector("#carrito");
const cartCloseButton = document.querySelector("#cartCloseButton");
const cartContainer = document.querySelector("#cartContainer");
const clearCartButton = document.querySelector("#clearCartButton");

const filterProducts = () => {
    const search = state.search.toLowerCase().trim();

    const filteredProducts = state.products.filter((product) => {
        const title = product.title.toLowerCase();
        const category = product.category.toLowerCase();
        const brand = product.brand?.toLowerCase() || "";

        const matchesSearch =
            title.includes(search) ||
            category.includes(search) ||
            brand.includes(search);

        const matchesCategory =
            state.category === "all" ||
            product.category === state.category;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
};

export const setupEvents = () => {

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        state.search = searchInput.value;

        filterProducts();
    });

    categorySelect.addEventListener("change", () => {
        state.category = categorySelect.value;

        filterProducts();
    });

    productsContainer.addEventListener("click", (event) => {

        if (!event.target.classList.contains("add-cart-button")) {
            return;
        }

        const productId = event.target.dataset.productId;

        const product = state.products.find(
            (product) => product._id === Number(productId)
        );

        if (!product) {
            return;
        }

        const existingProduct = state.cart.find(
            (item) => item._id === product._id
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            state.cart.push({
                ...product,
                quantity: 1
            });

        }

        renderCart(state.cart);

        console.log("Carrito:", state.cart);
    });

   cartContainer.addEventListener("click", (event) => {

    if (!event.target.classList.contains("remove-cart-button")) {
        return;
    }

    const productId = Number(event.target.dataset.productId);

    console.log("ID a eliminar:", productId);
    console.log("Carrito antes:", state.cart);

    const product = state.cart.find(
    (product) => product._id === productId
);

if (!product) {
    return;
}

if (product.quantity > 1) {
    product.quantity -= 1;
} else {
    state.cart = state.cart.filter(
        (product) => product._id !== productId
    );
}

renderCart(state.cart);
});

    cartButton.addEventListener("click", () => {
    cartSection.classList.add("open");
});

   cartCloseButton.addEventListener("click", () => {
    cartSection.classList.remove("open");
});
clearCartButton.addEventListener("click", () => {
    state.cart = [];

    renderCart(state.cart);
});

};
