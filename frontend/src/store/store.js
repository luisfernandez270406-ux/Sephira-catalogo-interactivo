import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    categories: categoriesReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});