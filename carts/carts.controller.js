const { agregarAlCarrito } = require('./carts.service')

const postCartController = async (req, res) => {
    const { product_id, cantidad } = req.body
const user = req.user

    //AGREGAR LAS FUNCIONES DE VALIDAR DATOS

    try {
        await agregarAlCarrito({ user_id, product_id, cantidad })

    }
    catch (error) {
        res.status(error.status).json({ error })
    }
}




module.exports = { postCartController }