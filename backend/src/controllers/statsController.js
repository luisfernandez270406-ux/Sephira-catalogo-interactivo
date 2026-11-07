import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getStats = async (req, res) => {
  try {
    const [totalCategories, totalProducts, totalOrders, revenueResult, byStatus] =
      await Promise.all([
        Category.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([
          { $match: { status: { $ne: "cancelado" } } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ]),
        Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      ]);

    res.json({
      totalCategories,
      totalProducts,
      totalOrders,
      revenue: revenueResult[0]?.total || 0,
      ordersByStatus: Object.fromEntries(byStatus.map(({ _id, count }) => [_id, count])),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};