const { query } = require('../config/connectio.sql')

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

const obtenerCarritoDetallado = async (cart_id) => {
    try {
        const obtenerCarritoStr = `
        SELECT productos.*, carritoProductos.cantidad FROM productos
        productos JOIN carrito_productos carritoProductos 
        ON
        productos.id = carritoProductos.product_id
        WHERE
        carritoProductos.cart_id = ?
        `
        const carrito = await query(obtenerCarritoStr, [cart_id])
        return carrito
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const eliminarProductoDelCarrito = async (cart_id, product_id) => {
    try {
        const eliminarProductoStr = `DELETE FROM carrito_productos WHERE cart_id = ? AND product_id = ?`
        await query(eliminarProductoStr, [cart_id, product_id])
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

module.exports = { obtenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito }