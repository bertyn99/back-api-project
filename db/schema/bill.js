const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const validator = require("validator");

let billSchema = new Schema(
  {
    idUser: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: true,
    },
    paidDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.ObjectId,
          ref: "Product",
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
