import { getProducts } from "./api.js";
import { state } from "./state.js";

const init = async () => {
  try {
    state.products = await getProducts();

    console.log("Productos cargados:", state.products);
  } catch (error) {
    console.error("No fue posible iniciar la aplicación.");
  }
};

init();
