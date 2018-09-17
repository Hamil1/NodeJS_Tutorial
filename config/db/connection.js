const Sequelize = require('sequelize');
const moment = require('moment');
const util = require('util');

sequelize = new Sequelize('sequelize_nodejs','root','',
{
host: 'localhost',
dialect: 'mysql',
port: '3306',
operatorsAliases: false
});

function test(){
    sequelize.authenticate()
    .then(() => {
        console.log('La conexión está hecha!');
    }).catch((err) => {
        console.error('No se pudo hacer la conexion a la base de datos ' + err);
    });
}

module.exports = {
    connection: sequelize,
    test: test,
    sequelize: Sequelize
};