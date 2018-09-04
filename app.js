const cpu = require('os');
const lib = require('./lib.js');

let pc = cpu.cpus();
let resultado = lib.sumarDosNumeros(5.5,2);
console.log(resultado);