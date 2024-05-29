const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product.model')

//get all products
router.get('/', async (req, res, next) => {
    try {
        
        const products = await productModel.find()

        return res.status(200).send({
            success: true,
            message: "Data found",
            data: products
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})

/* GET Product By ID */
router.get("/:id", async (req, res, next) => {
    try {
        let id = req.params.id;
        let product = await productModel.findById(id)

        return res.status(200).send({
            status: "200",
            message: "success",
            data: product
        })

    } catch (error) {
        return res.status(500).send({
            status: "500",
            status: 500,
            message: (error.toString())
        })
    }
})

//post product
router.post('/', async (req, res, next) => {
    try {

        const { productName, price, stock, order } = req.body
    
        const newProduct = new productModel({
            productName,
            price,
            stock,
            order
        })
    
        const product = await newProduct.save();
    
        return res.status(201).send({
            success: true,
            message: "create success!",
            data: product
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