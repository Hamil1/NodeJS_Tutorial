const Sequelize = require('../config/db/connection');

const sequelize = Sequelize.connection;

let personas = sequelize.define('personas',{ //Ponemos esto aquí por si la tabla no existe la pueda crear
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    direccion: Sequelize.TEXT
});

function insertarPersonas(paramNombre, paramApellido, paramDireccion){
    sequelize.sync().then(() => {
        personas.create({
            nombre: paramNombre,
            apellido: paramApellido,
            direccion: paramDireccion
        }).then((registros)=>{
                console.log(registros.dataValues.updatedAt);
                let fechaCreacion = new Date(registros.dataValues.createdAt).getTime();
                let fechaActualizacion = new Date(registros.dataValues.updatedAt).getTime();
                console.log('Esta es la fecha de actualizacion ' + fechaActualizacion + ' esta es la fecha de creacion ' + fechaCreacion);
            });
    });  
}

function traerRegistros(){
    personas.findAll().then((registros)=>{
            console.log(JSON.stringify(registros,null,2));
        });
}

module.exports = {
    insertarPersonas: insertarPersonas,
    traerPersonas: traerRegistros
};