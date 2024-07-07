const { query } = require('../config/connectio.sql') // importa la libreria de la base de datos. "query" es una funcion que permite ejecutar consultas en la base de datos.

const seleccionarProductoPorId = async (pid) => { //funcion para buscar un producto por id
    try {
        const consultaExistencia = 'SELECT * FROM productos WHERE id = ?' //consulta para buscar el producto por id en la base de datos.

        const resultado = await query(consultaExistencia, [pid]) // ejecuta la consulta en la base de datos.

        if (resultado.length === 0) {// valida si hay resultados 
            throw { status: 404, message: 'PRODUCTO CON ID: ' + pid + ' NO ENCONTRADO' } // retorna el error de proyecto no encontrado en la base de datos
        }
        else {
            return resultado[0] // retorna el producto encontrado
        }
    }
    catch (error) {
        if (error.status === 404) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }// retorna el error interno en la base de datos
    }
}

const insertarProducto = async ({ titulo, precio, descripcion, stock, codigo }) => { //funcion para insertar un producto
    try {
        const consultaString = 'INSERT INTO productos (titulo,precio, descripcion, stock, codigo) VALUES (?,?,?,?,?)' //consulta para insertar el producto en la base de datos. "INSERT INTO" es codigo de SQL. "SET" es una funcion que permite insertar datos en la base de datos. Todo es codigo de SQL. el "?" es un marcador de posicion. Se usa para evitar inyecciones SQL.
        const valores = [titulo, precio, descripcion, stock, codigo] // valores a insertar en la base de datos. 
        const resultado = await query(consultaString, valores) // ejecuta la consulta en la base de datos, retorna el id del proyecto insertado en la base de datos y el status de la insercion. 
        return resultado
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDORrrrrr' } // retorna el error interno en la base de datos
    }
}

const eliminarProducto = async (pid) => {
    try {
        const consultaString = 'DELETE FROM productos WHERE id = ?' //consulta para eliminar el producto de la base de datos.
        const valores = [pid] // valores a insertar en la base de datos.
        const resultado = await query(consultaString, valores) // ejecuta la consulta en la base de datos.
        return resultado // retorna el status de la insercion.
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN EL SERVIDOR' } // retorna el error interno en la base de datos
    }
}

const seleccionarTodosLosProductos = async () => {
    try {
        const consultaString = 'SELECT * FROM productos'
        const productos = await query(consultaString)
        return productos
    }
    catch (error) {
        if (error.status) {
            throw error
        }
        else {
            throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
        }
    }
}


module.exports = { seleccionarProductoPorId, insertarProducto, eliminarProducto, seleccionarTodosLosProductos }