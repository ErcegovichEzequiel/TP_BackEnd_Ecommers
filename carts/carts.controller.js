const { agregarAlCarritoService } = require('./carts.service')

const postCartController = async (req, res) => {
    const { product_id, cantidad } = req.body
    const user = req.user
    try {
        await agregarAlCarritoService({ user_id: user.user_id, product_id, cantidad })
        res.status(result.status).json({ result })
    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}




module.exports = { postCartController }