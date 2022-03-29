const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
const validator = require('validator')

let billSchema = new Schema({
    idUser: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    emissionDate: {
        type: Date,
        required: true,
    },
    isPaid: {
        type: bool,
        required: true,
    },
    paidDate: {
        type: Date,
        required: true,
    },
    price: {
        type: decimal,
        required: true,
    },
    products: [{
        type: mongoose.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
});

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill;