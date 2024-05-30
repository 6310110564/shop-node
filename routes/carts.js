const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const cartModel = require('../models/cart.model');

//post all cart
// router.post('/', async (req, res, next) => {
//     try {
//         const { product_data, user_data, amount } = req.body

//         const newCart = new cartModel({
//             product_data,
//             user_data,
//             amount
//         })

//         let cart = await newCart.save();

//         return res.status(200).send({
//             success: true,
//             message: "create cart success",
//             data: cart
//         })
        
//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             status: 500,
//             message: (error.toString(error))
//         })
//     }
// })

//get all cart
router.get('/', async (req, res, next) => {
    try {
        
        const carts = await cartModel.find()
            .populate('user_data')
            .populate('product_data')

        return res.status(200).send({
            success: true,
            message: "Data Found",
            data: carts
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,

        })
    }
})

//edit data in cart
router.put('/:id', async (req, res, next) => {
    try {
        
        let cart_id = req.params.id
        let { amount } = req.body

        let update_cart = await cartModel.findByIdAndUpdate(cart_id, { amount }, { new: true })

        return res.status(200).send({
            success: true,
            message: "update cart success!",
            data: update_cart
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})

//delete data in cart
router.delete('/:id', async (req, res, next) => {
    try {

        let cart_id = req.params.id
        let delete_cart = await cartModel.findByIdAndDelete(cart_id)

        return res.status(200).send({
            success: true,
            message: "delete success!",
            data: delete_cart
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})

module.exports = router