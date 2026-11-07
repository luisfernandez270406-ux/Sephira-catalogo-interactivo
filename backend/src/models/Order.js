import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: [1, "La cantidad mínima es 1"] },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "El nombre del cliente es obligatorio"],
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    items: {
      type: [orderItemSchema],
      validate: [(items) => items.length > 0, "El pedido debe tener al menos un producto"],
    },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pendiente", "enviado", "entregado", "cancelado"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);