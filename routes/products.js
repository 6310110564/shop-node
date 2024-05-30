const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');

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

        const { productName, price, stock } = req.body
    
        const newProduct = new productModel({
            productName,
            price,
            stock
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

router.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        const { productName, price, stock } = req.body

        let product_update = await productModel.findByIdAndUpdate(
            id,
            { productName, price, stock },
            { new: true }
        )

        return res.status(200).send({
            success: true,
            message: "update success!",
            data: product_update
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})

router.delete('/:id', async (req, res, next) => {
    try {

        let id = req.params.id
        let delete_product = await productModel.findByIdAndDelete(id)

        return res.status(200).send({
            success: true,
            status: "200",
            data: delete_product
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString(error))
        })
    }
})

//GET Carts
// router.get('/:id/carts', async(req, res, next) => {
//     try {
//         const products_id = req.params.id;

//         const order
//     } catch (error) {
        
//     }
// })

//POST Cart
router.post('/:id/carts', async (req, res, next) => {
    try {
        const product_id = req.params.id
        const { user_id, amount } = req.body

        // const product = await productModel.findById(product_id)

        // if(amount > product.stock) {
        //     return res.status(400).send({
        //         success: false,
        //         status: "400",
        //         message: "ไม่สามารถเพิ่ม order ได้ เนื่องจากจำนวน stock ไม่เพียงพอ"
        //     })
        // }

        const newCart = new cartModel({
            product_data: product_id,
            user_data: user_id,
            amount
        })

        const cart = await newCart.save()

        return res.status(200).send({
            success: true,
            message: "add cart success!",
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

module.exports = router