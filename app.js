const cpu = require('os');
const lib = require('./lib.js');
const request = require('request');
const https = require('https');
const fetch = require('node-fetch');

fetch('https://api.github.com/users/Hamil1').then(function(data){
    console.log(data);
    return data.json();
}).then(function(json){
    console.log('Este es el resultado de la consulta: ' + JSON.stringify(json));
    debugger;
});
