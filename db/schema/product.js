const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

function getFloat(value) {
  return value && value["$numberDecimal"] ? value["$numberDecimal"] : 0;
}
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
      get: (v) => v.toString(),
    },
  },
  {
    timestamps: true,
  }
);
productSchema.set("toJSON", { getters: true });
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
