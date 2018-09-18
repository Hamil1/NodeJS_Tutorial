const person = require('../models/personas');
const soap = require('soap');
const util = require('util');
const parseString = require('xml2js').parseString;
const request = require('request');
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
    let url = 'http://dataportal.jce.gob.do/idcons//IndividualDataHandler.aspx?ServiceID=fcc74678-8ba8-423d-809c-7bcefa74b3e7&ID1=001&ID2=1948533&ID3=2';
    request.get({
        url: url,
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'dataportal.jce.gob.do',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    }, (err, response, body)=>{
        console.log('error: ', err);
        console.log('statusCode', response && response.statusCode);
        console.log('body', body);
    });
    // let xml = '<root><mun_ced>001</mun_ced><seq_ced>1948533</seq_ced><ver_ced>2</ver_ced><nombres>VICTOR HAMIL</nombres><apellido1>DIAZ</apellido1><apellido2>DE LA CRUZ</apellido2><fecha_nac>12/28/1995 12:00:00 AM</fecha_nac><lugar_nac>SANTO DOMINGO, R.D.</lugar_nac><ced_a_num>000000</ced_a_num><ced_a_seri>000</ced_a_seri><ced_a_sexo>M</ced_a_sexo><sexo>M</sexo><est_civil>S</est_civil><estatus>T</estatus><fotourl>/idcons/Portals/0/IDFoto/d1e8d79e-90ae-4d4c-b120-feee50429ed6.jpg</fotourl><success>true</success><message>Success</message><responsetime>265</responsetime></root>';
    // soap.createClient(url, (err, client)=>{
    //     console.log(util.inspect(client));
    // });

    // parseString(xml, (error, result)=>{
    //     if(error){
    //         console.log("ERROR: " + error);
    //     }
    //     let root = result.root;
    //     let nombrePersona = root.nombres;
    //     console.log(`${nombrePersona}`);
    //     res.send(nombrePersona);
    // });
    
}

module.exports = {
    insertarPersonas,
    traerRegistros,
    traerNombre,
    actualizarInstancia,
    eliminarInstancia,
    consultarPersonaJCE
}