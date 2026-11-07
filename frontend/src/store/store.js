import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});