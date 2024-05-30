const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const cartModel = require('../models/cart.model');

//post cart
router.post('/', async (req, res, next) => {
    try {
        const { product_data, user_data, amount } = req.body

        const newCart = new cartModel({
            product_data,
            user_data,
            amount
        })

        let cart = await newCart.save();

        return res.status(200).send({
            success: true,
            message: "create cart success",
            data: cart
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})