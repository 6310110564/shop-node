const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'canceled'],
        default: 'pending'
    },
    status_payment: {
        type: Boolean,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: {
        type: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)