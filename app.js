var express = require('express');
var app = express();

app.use(function(req, res, next){
    console.log("Middleware 1");
    next();
});

app.get("/", function(req, res, next){
    res.send("Esta entrando al metodo");
    console.log("Este es el middleware");
    next();
});

app.use(function(req, res, next){
    console.log("Middleware 2");
    next();
});

app.listen(3000);

