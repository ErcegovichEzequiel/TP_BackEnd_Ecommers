const { validacionExistencia, minYmaxCaracteres, tipoDeDato } = require("../../helpers/validation.helper")

const validacionCargaProducto = (product) => {
    // Define las propiedades permitidas para un producto
    const allowedProperties = ['titulo', 'precio', 'descripcion', 'stock', 'codigo']

    // Itera sobre las propiedades del objeto product
    for (const key of Object.keys(product)) {
        // Si alguna propiedad no está en allowedProperties, lanza un error
        if (!allowedProperties.includes(key)) {
            throw { status: 400, message: `ERROR: ${key} no es un dato habilitado para crear un producto` }
        }
    }

    // Define las validaciones para cada propiedad del producto
    const validations = {
        titulo: [
            { func: validacionExistencia, message: 'Debe colocar un titulo' },
            { func: valor => minYmaxCaracteres(valor, 3, 30), message: 'El titulo debe tener al menos 3 caracteres y un maximo de 30' },
            { func: valor => tipoDeDato(valor, 'string'), message: 'El titulo solo acepta letras' }
        ],
        precio: [
            { func: validacionExistencia, message: 'Debe colocar un precio y el valor debe ser numerico mayor a 0' },
            { func: valor => !isNaN(valor), message: 'El precio debe ser numerico y mayor a 0' },
            { func: valor => valor >= 0, message: 'El precio no puede ser negativo' },
            { func: valor => tipoDeDato(valor, 'number'), message: 'El precio solo acepta numeros' }
        ],
        descripcion: [
            { func: validacionExistencia, message: 'Debe colocar una descripcion' },
            { func: valor => minYmaxCaracteres(valor, 20, 60), message: 'La descripción debe tener al menos 20 caracteres y un maximo de 60' },
            { func: valor => tipoDeDato(valor, 'string'), message: 'La descripción solo acepta letras' }
        ],
        stock: [
            { func: validacionExistencia, message: 'Debe colocar un stock' },
            { func: valor => !isNaN(valor), message: 'El stock debe ser numerico' },
            { func: valor => valor >= 0, message: 'El stock no puede ser negativo ni cero' },
            { func: valor => tipoDeDato(valor, 'number'), message: 'El stock solo acepta numeros' }
        ],
        codigo: [
            { func: validacionExistencia, message: 'Debe colocar un codigo' },
            { func: valor => minYmaxCaracteres(valor, 1, 100), message: 'El codigo debe tener al menos 1 caracter y un maximo de 100' },
            { func: valor => tipoDeDato(valor, 'string'), message: 'El codigo solo acepta letras' }
        ]
    }

    for (const key of allowedProperties) { // Itera sobre las propiedades permitidas
        // Si la propiedad está definida en el producto, realiza las validaciones
        if (product[key] !== undefined) {
            // Itera sobre las validaciones definidas para la propiedad
            for (const validation of validations[key]) {
                // Si alguna validación falla, lanza un error con el mensaje correspondiente
                if (!validation.func(product[key])) {
                    throw { status: 400, message: validation.message }
                }
            }
        }
    }
}

module.exports = { validacionCargaProducto }


// ANOTACIONES: El "func" es simplemente una propiedad de un objeto. Puede tener cualquier nombre, pero en este caso se eligió func porque se refiere a una función de validación.
// El uso de "val =>" es una forma abreviada de definir una función anónima.