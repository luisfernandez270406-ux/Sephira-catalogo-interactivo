import { getProducts } from "./api.js";
import { state } from "./state.js";
import { renderProducts, renderCategories } from "./ui.js";
import { setupEvents } from "./events.js";

const init = async () => {
  try {
    state.products = await getProducts();

    console.log("Productos cargados:", state.products);

    state.categories = [
      ...new Set(state.products.map((product) => product.category)),
    ];

    console.log("Categorías:", state.categories);

    renderProducts(state.products);
    renderCategories(state.categories);

    setupEvents();
  } catch (error) {
    console.error("No fue posible iniciar la aplicación.");
    console.error(error);
  }
};

init();
