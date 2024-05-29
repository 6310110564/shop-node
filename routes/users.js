var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const usersModel = require('../models/users.model');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await usersModel.find();

    return res.status(200).send({
      success: true,
      message: "Data found",
      data: users
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: (error.toString(error))
    })
  }
});

//register
router.post('/register', async function (req, res, next) {
  try {
    let { firstName, lastName, email, password } = req.body
    
    const newUser = new usersModel({
      firstName,
      lastName,
      email,
      password
    })

    const user = await newUser.save();

    return res.status(200).send({
      success: true,
      message: "create user success!",
      data: user
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: (error.toString(error))
    })
  }
})

//login
router.post('/login', async function (req,res, next) {
  try {
    const { email, password } = req.body
    const user = await usersModel.findOne({ email: email})

    if (!user || user.password !== password ) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "email or password Incorrect"
      })
    }

      const token = jwt.sign({
        admin: user.admin
      }, 
        process.env.TOKEN_KEY,
      {
        expiresIn: "6h"
      }
    )

    return res.status(200).send({
      success: true,
      message: "login success!",
      token: token
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: (error.toString(error))
    })
  }
})

router.put('/:id', async function (req, res, next) {
  try {
    const user_id = req.params.id
    const { firstName, lastName, email } =req.body

    const update_user = await usersModel.findByIdAndUpdate(user_id, { firstName, lastName, email }, { new: true })

    if(!update_user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).send({
      success: true,
      message: "update user success!",
      data: update_user
    })

  } catch (error) {
    return res.status(500).send({
      success: false,
      status: 500,
      message: (error.toString(error))
    })
  }
})

router.delete('/:id', auth.authenticateToken, auth.checkAdmin, async function(req, res, next) {
  try {
    const user_id = req.params.id
    const delete_user = await usersModel.findByIdAndDelete(user_id)

    return res.status(200).send({
      success: true,
      message: "delete success!",
      data: delete_user
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      messages: (error.toString(error))
    })
  }
})

module.exports = router;
