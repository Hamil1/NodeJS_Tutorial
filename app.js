const cpu = require('os');
const lib = require('./lib.js');

let pc = cpu.cpus();
let resultado = lib.sumarDosNumeros(1,2);
console.log(resultado);