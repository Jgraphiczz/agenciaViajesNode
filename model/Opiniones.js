import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Opinion = db.define('opiniones',{
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
})