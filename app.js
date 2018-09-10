const hbs = require('hbs');
const express = require('express');
const app = express();

let personas = [
    {
        id: 1,
        nombre: "Carlos"
    },
    {
        id: 2,
        nombre: "Jose"
    },
    {
        id: 3,
        nombre: "Miguel"
    }

];

let titulo = "Hamil te puedes sentir orgulloso!";
app.set('view engine', 'hbs');

app.get('/', function(req, res){
    res.render('index.hbs', {personas: personas, titulo: titulo});
});

app.listen(3000);
