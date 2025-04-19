const Product = require('../models/productModel');

// @desc    Get all products
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

// @desc    Add new product
// @route   POST /api/products
// @access  Private (requires token)
exports.addProduct = async (req, res) => {
  const { name, image, description, price, category } = req.body;

  // Basic validation
  if (!name || !description || !price) {
    return res.status(400).json({ message: "Name, description, and price are required." });
  }

  try {
    const product = new Product({
      name: name.trim(),
      image: image?.trim() || "",
      description: description.trim(),
      price,
      category: category?.trim() || "Bakery",
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(400).json({ message: "Failed to create product" });
  }
};
