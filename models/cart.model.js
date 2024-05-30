const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    user_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('carts', cartSchema)