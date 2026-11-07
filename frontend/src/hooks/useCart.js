import { useState } from "react";

export const useCart = () => {
  const [items, setItems] = useState([]);

  const addItem = ({ _id, name, price, stock }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === _id);

      if (!existing) {
        return [...prev, { _id, name, price, stock, quantity: 1 }];
      }

      return prev.map((item) =>
        item._id === _id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const increase = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const decrease = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item._id !== id));

  const clear = () => setItems([]);

  const totalItems = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const totalPrice = items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  return { items, addItem, increase, decrease, removeItem, clear, totalItems, totalPrice };
};