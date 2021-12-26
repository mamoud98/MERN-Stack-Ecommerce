const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please enter your product name"],
      maxlength: [32, "maxlength category length is 32 product name"],
    },
    description: {
      type: String,
      required: [true, "please enter your product description"],
      maxlength: [
        2000,
        "maxlength category length is 2000 product description",
      ],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "please enter your product price"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "please select your product category"],
    },
    quantity: {
      type: Number,
      required: [true, "please enter your product quantity"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      type: Buffer,
    },
    contentType: {
      type: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
