const Product = require("../models/Product");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const { search, category } = req.query;
      let filter = { createdBy: req.session.user.id };

      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      if (category && category !== "all") {
        filter.category = category;
      }

      const products = await Product.find(filter).sort({ createdAt: -1 });
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      const product = new Product({
        name,
        description,
        price: parseFloat(price),
        category,
        createdBy: req.session.user.id,
      });

      await product.save();
      res.json({ message: "Product created successfully", product });
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      const product = await Product.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.session.user.id },
        { name, description, price: parseFloat(price), category },
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.session.user.id,
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Product.findOne({
        _id: req.params.id,
        createdBy: req.session.user.id,
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ product });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },
};

module.exports = productController;
