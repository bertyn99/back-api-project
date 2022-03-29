const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const validator = require('validator')

let productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: int,
        required: true,
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: decimal,
        required: true,
    }

}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product;