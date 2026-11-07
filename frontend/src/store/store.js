import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    categories: categoriesReducer,
  },
});