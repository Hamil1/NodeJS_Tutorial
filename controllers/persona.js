const person = require('../models/personas');
const soap = require('soap');
const util = require('util');
const personas = person.personas;

function insertarPersonas(req, res, next){
    connection.sync().then(() => {
        personas.create({
            nombre: req.params.nombre,
            apellido: req.params.apellido,
            direccion: req.params.direccion
        }).then((registros)=>{
                console.log(registros.dataValues.updatedAt);
                let fechaCreacion = new Date(registros.dataValues.createdAt).getTime();
                let fechaActualizacion = new Date(registros.dataValues.updatedAt).getTime();
                console.log('Esta es la fecha de actualizacion ' + fechaActualizacion + ' esta es la fecha de creacion ' + fechaCreacion);
            });
    });  
}

function traerRegistros(req, res, next){
    personas.findAll().then((registros)=>{
            // console.log(JSON.stringify(registros,null,2));
        });
        next();
}

function actualizarInstancia(req, res, next){
    personas.update({nombre: req.nombre, apellido: req.apellido},{
        where: {
            id: req.params.id
        }
    });
}

function traerNombre(req, res, next){
    personas.findOne({
        where: {
            id: req.params.id
        }
    }).then((instancia)=>{
        console.log(instancia.nombre);
    });
    next();
}

function eliminarInstancia(req, res, next){
    personas.destroy({
        where: {
            id: req.params.id
        }
    });
}

function consultarPersonaJCE(req, res, next){

}

module.exports = {
    insertarPersonas,
    traerRegistros,
    traerNombre,
    actualizarInstancia,
    eliminarInstancia
}