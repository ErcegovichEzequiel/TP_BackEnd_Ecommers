const { seleccionarProductoPorId, insertarProducto, eliminarProducto } = require("./products.repository")
const { validacionCargaProducto } = require("./utils/validationProducts.utils")

const createProduct = async (product) => {
    try {
        validacionCargaProducto(product) // valida que los datos sean correctos, se pasa el objeto sin desestructurar para que pueda informar si cargo mas propiedades de las que se piden. Si le paso solo la desestructuracion, no tengo como informar si hay mas propiedades de las solicitadas.

        // const productoExistente = await seleccionarProductoPorId(product.codigo) // busca si el producto ya existe en la base de datos

        // if (productoExistente) {
        //     throw { status: 400, message: 'ERROR: Producto ya existente' }
        // }

        const resultado = await insertarProducto(product) // inserta el producto en la base de datos
        if (resultado) {
            return { ok: true, message: 'Se inserto nuevo producto', id: resultado.insertId, producto: product }
        }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const obtenerProductoPorId = async (pid) => {
    try {
        const producto = await seleccionarProductoPorId(pid) // busca el producto en la base de datos
        return { ok: true, status: 200, producto }
    }
    catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const eliminarProductoPorId = async (pid) => {
    try {
        const producto = await seleccionarProductoPorId(pid) // busca el producto en la base de datos
        if (producto) { // valida si el producto existe
            await eliminarProducto(pid) // espera el resultado de eliminarProducto
            return { ok: true, status: 200, message: 'PRODUCTO CON ID: ' + pid + ' ELIMINADO CORRECTAMENTE' }
        } else {
            throw { status: 404, message: 'Producto no encontrado' }
        }
    } catch (error) {
        if (error.status) {
            throw error
        } else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}

const modificarProducto = async (pid) => {
    try {

    }
    catch (error) {

    }
}


module.exports = { createProduct, obtenerProductoPorId, eliminarProductoPorId, modificarProducto }