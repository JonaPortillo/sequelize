const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre no puede estar vacío"
            },
            isAlpha: {
                args: true,
                msg: "El nombre debe contener solo letras"
            },
            len: {
                args: [2, 255],
                msg: "El nombre debe ser de entre 2 y 255 caracteres"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "El campo email debe ser un email válido"
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: "El campo edad debe ser un número"
            },
            min: {
                args: 18,
                msg: "La edad deber der mayor a 18 años"
            },
            max: {
                args: 100,
                msg: "La edad deber der real"
            },
            // Validación personalizada
            esPar(value) {
                if (value % 2 != 0) {
                    throw new Error("La edad tiene que ser un número par")
                }
            }
        }
    },

    //Usuario normal o admin
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: false
});

module.exports = User