import { createSlice } from "@reduxjs/toolkit";

export const CART_STORAGE_KEY = "sephira_cart";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() },
  reducers: {
    addToCart: (state, { payload: { _id, name, price, image, stock } }) => {
      const existing = state.items.find((item) => item._id === _id);

      if (!existing) {
        state.items.push({ _id, name, price, image, stock, quantity: 1 });
      } else if (existing.quantity < existing.stock) {
        existing.quantity += 1;
      }
    },
    increaseQuantity: (state, { payload: id }) => {
      const item = state.items.find((i) => i._id === id);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },
    decreaseQuantity: (state, { payload: id }) => {
      const item = state.items.find((i) => i._id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, { payload: id }) => {
      state.items = state.items.filter((i) => i._id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, { quantity }) => sum + quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;