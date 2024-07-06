const express = require('express')

const { verifyTokenMiddlewar } = require('../auth/auth.middleware')
const { postCartController } = require('./carts.controller')

const cartsRouter = express.Router()

cartsRouter.get('/')
cartsRouter.post('/', verifyTokenMiddlewar, postCartController)


module.exports = { cartsRouter }