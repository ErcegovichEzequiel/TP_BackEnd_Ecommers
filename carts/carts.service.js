const { obtenerOCrearCarrito, agregarAlCarrito } = require('./carts.repository')


const agregarAlCarritoService = async (datos) => {
    try {
        const { user_id, product_id, cantidad } = datos
        const carrito = await obtenerOCrearCarrito(user_id)
        const carritoId = carrito.id
        await agregarAlCarrito(carritoId, product_id, cantidad)
        return{
            status: 200, 
            message: 'Producto agregado al carrito'
        }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }       
    }
}

module.exports = { agregarAlCarrito }