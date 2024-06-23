const { query } = require('../config/connectio.sql') // importa la libreria de la base de datos. "query" es una funcion que permite ejecutar consultas en la base de datos.



const buscarUsuarioPorEmail = async (email) => { //funcion para buscar un usuario por email
    try {
        // Logica para buscar el usuario
        const consultaExistencia = 'SELECT * FROM usuarios WHERE email = ?' //consulta para buscar el usuario por email en la base de datos.

        const resultado = await query(consultaExistencia, [email]) // ejecuta la consulta en la base de datos.

        if (resultado.length > 0) {
            return resultado[0] // retorna el usuario encontrado
        } else {
            return null // retorna null, significa que no hay resultados
        }
    }
    catch (error) {
        throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS' }
    }
}

const insertarUsuario = async (usuario) => { // funcion para insertar un usuario
    try {
        const consulta = 'INSERT INTO usuarios SET ?' //consulta para insertar el usuario en la base de datos. "INSERT INTO" es una funcion que permite insertar datos en la base de datos. Todo es codigo de SQL. "SET" es una funcion que permite insertar datos en la base de datos. Todo es codigo de SQL. el "?" es un marcador de posicion. Se usa para evitar inyecciones SQL.

        const resultado = await query(consulta, usuario) // ejecuta la consulta en la base de datos, retorna el id del usuario insertado en la base de datos y el status de la insercion.

        return true // retorna true, significa que se inserto el usuario
    }
    catch (error) {
        throw { status: 500, message: error.sqlMessage } // retorna el error interno en la base de datos
    }
}



module.exports = { buscarUsuarioPorEmail, insertarUsuario } 