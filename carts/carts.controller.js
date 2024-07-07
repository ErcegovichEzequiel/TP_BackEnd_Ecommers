const { agregarAlCarritoService } = require('./carts.service')

const postCartController = async (req, res) => {
    const { product_id, cantidad } = req.body
    const user = req.user
    try {
        const result = await agregarAlCarritoService({ user_id: user.user_id, product_id, cantidad })
        res.status(result.status).json(result)
    }
    catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message })

    }
}

module.exports = { postCartController }