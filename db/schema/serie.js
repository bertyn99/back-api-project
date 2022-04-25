const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const validator = require("validator");

let serieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "Pas encore de description",
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

serieSchema.virtual("volumes", {
  ref: "Product",
  foreignField: "serie",
  localField: "_id",
});
const Serie = mongoose.model("Serie", serieSchema);

module.exports = Serie;
