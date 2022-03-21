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

productSchema.methods.generateAuthToken = async function() {
    const product = this
    const token = jwt.sign({ _id: product._id.toString() }, process.env.JWT_KEY)
    product.tokens = product.tokens.concat({ token })
    await product.save()

    return token
}
productSchema.statics.findByCredentials = async(email, password) => {
    const product = await Product.findOne({ email })
    console.log(product)
    if (!product) {
        throw new Error('Unable to login.')
    }

    const isMatch = await bcrypt.compare(password, product.password)

    if (!isMatch) {
        throw new Error('Unable to login.')
    }
    return product
}

productSchema.pre('save', async function(next) {
    const product = this
    if (product.isModified('password')) {
        product.password = await bcrypt.hash(product.password, 8)
    }

    next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;