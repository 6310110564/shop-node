var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

const orderModel = require('../models/orders.model')
const usersModel = require('../models/users.model')

router.get('/', async function (req, res, next) {
    try {
        const orders = await orderModel.find().populate('userId');

        return res.status(200).send({
            success: true,
            message: "Data found",
            data: orders
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString())
        });
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const user_id = req.params.id

        const orders = await orderModel.find({ userId: user_id }).populate('userId');

        console.log('order: ', orders);
        return res.status(200).send({
            success: true,
            message: "Data found",
            data: orders
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: (error.toString())
        });
    }
});

// router.post('/', async function( req, res, next) {
//     try {
//         const { amount, user } = req.body

//         const newOrder = new orderModel({
//             amount,
//             user
//         })

//         const order = await newOrder.save()

//         return res.status(201).send({
//             success: true,
//             message: "create success!",
//             data: order
//         })  

//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             status: 500,
//             message: (error.toString(error))
//         })
//     }

// })

router.post('/qr-code', async function (req, res, next) {
    try {
        let data = JSON.stringify({
            "order_id": "12",
            "price": 200
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://192.168.75.220:3000/api/v1/product/qr',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios.request(config);
        const qrData = response.data;

        return res.status(201).send({
            success: true,
            message: "create success!",
            data: qrData
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: error.toString()
        });
    }
});

module.exports = router