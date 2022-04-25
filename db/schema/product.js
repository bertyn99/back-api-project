const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const validator = require("validator");

let productSchema = new Schema(
  {
    serie: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Serie",
    },
    volume: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
