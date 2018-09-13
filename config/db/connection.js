const Sequelize = require('sequelize');

sequelize = new Sequelize('sequelize_nodejs','root','',{host: 'localhost', dialect: 'mysql', operatorsAliases: false});

function test(){
    sequelize.authenticate()
    .then(() => {
        console.log('La conexión está hecha!');
    }).catch((err) => {
        console.error('No se pudo hacer la conexion a la base de datos ' + err);
    });
}

function crearPersonas(){
    let personas = sequelize.define('personas',{
        nombre: Sequelize.STRING,
        apellido: Sequelize.STRING,
        direccion: Sequelize.TEXT
    });

    console.log('Esta pasando');
}

module.exports = {
    connection: sequelize,
    test: test,
    crearPersonas: crearPersonas
};