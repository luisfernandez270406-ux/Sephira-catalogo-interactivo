import "dotenv/config";
import mongoose from "mongoose";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB Atlas");

    const response = await fetch("https://fakestoreapi.com/products");
    const items = await response.json();

    await Product.deleteMany();
    await Category.deleteMany();

    const names = [...new Set(items.map((item) => item.category))];
    const categories = await Category.insertMany(
      names.map((name) => ({ name, description: `Productos de ${name}` }))
    );

    const categoryByName = Object.fromEntries(
      categories.map((c) => [c.name, c._id])
    );

    const products = items.map(({ title, description, price, image, category }) => ({
      name: title,
      description,
      price,
      image,
      stock: 20,
      category: categoryByName[category],
    }));

    await Product.insertMany(products);

    console.log(`Seed listo: ${categories.length} categorías y ${products.length} productos`);
  } catch (error) {
    console.error("Error en el seed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();