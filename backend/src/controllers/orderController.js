import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "El pedido debe tener al menos un producto" });
    }

    const products = await Product.find({
      _id: { $in: items.map((item) => item.product) },
    });

    const orderItems = items.map(({ product, quantity }) => {
      const found = products.find((p) => p._id.equals(product));
      if (!found) {
        throw new Error("Uno de los productos no existe");
      }
      return { product: found._id, name: found.name, price: found.price, quantity };
    });

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      customerName,
      customerEmail,
      items: orderItems,
      total: Math.round(total * 100) / 100,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, status } = req.body;
    const changes = Object.fromEntries(
      Object.entries({ customerName, customerEmail, status }).filter(
        ([, value]) => value !== undefined
      )
    );

    const order = await Order.findByIdAndUpdate(req.params.id, changes, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};