const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: [{ type: String, default: "" }],
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  subcategory: {
    type: String,
    reqyired: true,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
