const person = require('../models/personas'),
soap = require('soap'),
util = require('util'),
parseString = require('xml2js').parseString,
request = require('ajax-request'),
fs = require('fs'),
http = require('http'),

personas = person.personas;
connection = person.connection;

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

function traerNombre(req, res){
    personas.findOne({
        where: {
            id: req.params.id
        }
    }).then((instancia)=>{
        res.send(instancia.nombre);
    }).catch((error)=>{
        res.send("No encontró registros");
    });
}

function eliminarInstancia(req, res, next){
    personas.destroy({
        where: {
            id: req.params.id
        }
    });
}

function consultarPersonaJCE(req, res){
    let cedula = req.params.cedula;
    let cedulaFormato = cedula.replace(/([0-9]{3})([0-9]{7})([0-9]{1})/, "ID1=$1&ID2=$2&ID3=$3");
    let url = `http://dataportal.jce.gob.do/idcons//IndividualDataHandler.aspx?ServiceID=fcc74678-8ba8-423d-809c-7bcefa74b3e7&${cedulaFormato}`;
    
    request({
        url: url,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
        }
    }, (err, resp, body) => {
        parseXmlAndResponse(body, res);
    });
}

function parseXmlAndResponse(data, res){
    parseString(data, (error, result)=>{
        if(error){
            console.log("ERROR: " + error);
        }
        res.send(JSON.stringify(result));
    });
}

function consultarPersonaDBLocal(req, res){
    connection.query(`SELECT * FROM personas WHERE id = ${req.params.id}`).then((query)=>{
        console.log(`Resultado del query: \n ${JSON.stringify(query, null, 3)}`);
        res.send(JSON.stringify(query, null, 3));
    });
}

function insertarPersonaDBLocal(req, res){
    connection.query(`INSERT INTO personas (nombre, apellido, direccion, createdAt, updatedAt) VALUES ('${req.params.nombre}', 
        '${req.params.apellido}',
        '${req.params.direccion}',
        ${new Date().getTime()},
        ${new Date().getTime()})`).then((resultado) =>{
            res.send(`Inserción realizada con éxito -> ${resultado}`);
        }
    ).catch((error)=>{
        res.send(`Problemas con la inserción ${error.message}`);
    });
}

module.exports = {
    insertarPersonas,
    traerRegistros,
    traerNombre,
    actualizarInstancia,
    eliminarInstancia,
    consultarPersonaJCE,
    consultarPersonaDBLocal,
    insertarPersonaDBLocal
}