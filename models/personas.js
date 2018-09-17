const conn = require('../config/db/connection');

const connection = conn.connection;
const Sequelize = conn.sequelize;

let personas = connection.define('personas',{ //Ponemos esto aquí por si la tabla no existe la pueda crear
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    direccion: Sequelize.TEXT
});

function insertarPersonas(paramNombre, paramApellido, paramDireccion){
    connection.sync().then(() => {
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

function actualizarInstancia(id){
    personas.update({nombre: "Joselito", apellido: "Ramirez"},{
        where: {
            id: id
        }
    });
}

function traerNombre(){
    personas.findOne().then((instancia)=>{
        console.log(instancia.nombre);
    });
}

function eliminarInstancia(id){
    personas.destroy({
        where: {
            id: id
        }
    });
}

module.exports = {
    insertarPersonas: insertarPersonas,
    traerPersonas: traerRegistros,
    traerNombre: traerNombre,
    actualizarInstancia: actualizarInstancia,
    eliminarInstancia: eliminarInstancia
};