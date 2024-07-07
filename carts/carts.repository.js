const { query } = require("express")

const obtenerOCrearCarrito = async (user_id) => {
    try {
        const seleccionarCarritoPorIdStr = `SELECT * FROM carritos WHERE user_id = ?`
        let carrito = await query(seleccionarCarritoPorIdStr, [user_id])
        if (carrito.length === 0) {
            const insertarCarritoStr = `INSERT INTO carritos (user_id) VALUES (?)`
            await query(insertarCarritoStr, [user_id])
            carrito = await query(seleccionarCarritoPorIdStr, [user_id])
        }
        return carrito[0]
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const agregarAlCarrito = async (cart_id, product_id, cantidad) => {
    try {
        const seleccionarProductoStr = `SELECT * FROM carrito_productos WHERE cart_id = ? AND product_id = ?`
        const productos = await query(seleccionarProductoStr, [cart_id, product_id])
        if (productos.length === 0) {
            const insertarProductoAlCarritoStr = `INSERT INTO carrito_productos (cart_id, product_id, cantidad) VALUES (?, ?, ?)`
            await query(insertarProductoAlCarritoStr, [cart_id, product_id, cantidad])
        }
        else {
            const actualizarFilaCarritoStr = `UPDATE carrito_productos SET cantidad = cantidad + ? WHERE cart_id = ? AND product_id = ?`
            await query(actualizarFilaCarritoStr, [cantidad, cart_id, product_id])
        }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}


module.exports = { obtenerOCrearCarrito, agregarAlCarrito }