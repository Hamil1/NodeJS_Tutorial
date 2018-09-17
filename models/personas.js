const conn = require('../config/db/connection');

const connection = conn.connection;
const Sequelize = conn.sequelize;

let personas = connection.define('personas',{ //Ponemos esto aquí por si la tabla no existe la pueda crear
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    direccion: Sequelize.TEXT
});

module.exports = {
    personas
};