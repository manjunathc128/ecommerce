const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const productList = await Product.find();
    if (!productList) {
      return res
        .status(500)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a product
router.post("/create", async (req, res) => {
  const limit = pLimit(2); // Limit concurrent uploads to 2

  try {
    // Validate request body
    const {
      name,
      description,
      brand,
      category,
      subcategory,
      price,
      mrp,
      offer,
      countInStock,
      rating,
      numReviews,
      images,
    } = req.body;

    if (!name || !description || !brand || !category || !price || !images) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload images to Cloudinary
    const imagesToUpload = images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesToUpload);
    const imgurl = uploadStatus.map((item) => item.secure_url);

    // Create new product
    const product = new Product({
      name,
      description,
      brand,
      images: imgurl,
      category,
      subcategory,
      price,
      mrp,
      offer,
      countInStock,
      rating,
      numReviews,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

module.exports = router;
