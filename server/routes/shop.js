const express = require("express");
const route = express.Router();

// Models
const Shop = require("../models/Shop");
const User = require("../models/User");

// Libs
const { genProd } = require("../lib/genId");

route.post(`/add`, async (req, res) => {
  try {
    const { name, image, price, desc } = req.body;
    if (!name || !price)
      return res.status(401).json({ error: "Error adding products" });

    await Shop.create({
      prodId: genProd(),
      name,
      image,
      price,
      desc,
    });

    res.status(201).json({ message: "Product created successfully..." });
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
    console.error("Error adding prod", err);
  }
});
route.get(`/products`, async (req, res) => {
  try {
    const shop = await Shop.find({});

    res.status(200).json({ shop });
  } catch (err) {
    res.status(500).json({ error: "Error fetching products..." });
    console.error("Error fetching products", err);
  }
});

route.post(`/cart-add`, async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId)
      return res.status(401).json({ error: "Error adding to cart..." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found..." });

    user.cart[user?.cart?.length] = productId;

    await user.save();

    res.status(200).json({ message: "Added to cart successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding to cart..." });
  }
});

route.get(`/get-cart/:userId`, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("cart");
    if (!user) return res.status(404).json({ error: "User not found..." });

    const cartIds = Array.isArray(user.cart) ? user.cart : [];
    if (cartIds.length === 0)
      return res.status(200).json({ message: "Cart fetched", cart: [] });

    // Count quantities for each product id in the cart
    const counts = cartIds.reduce((acc, id) => {
      const key = String(id);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const uniqueIds = Object.keys(counts);
    const products = await Shop.find({ _id: { $in: uniqueIds } }).lean();

    // Map products back to quantities and preserve only found products
    const productMap = products.reduce((m, p) => {
      m[String(p._id)] = p;
      return m;
    }, {});

    const cart = uniqueIds
      .map((id) => {
        const product = productMap[id];
        if (!product) return null; // product was removed from shop
        return { product, quantity: counts[id] };
      })
      .filter(Boolean);

    res.status(200).json({ message: "Cart fetched", cart });
  } catch (err) {
    console.error("Error fetching cart...", err);
    res.status(500).json({ error: "Error fetching cart" });
  }
});

module.exports = route;
