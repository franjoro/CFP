// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos los módulos de express y body-parser, morgan
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Llamamos a express para poder crear el servidor
const app = express();
//Llamamos morgan en dev
app.use(morgan('dev'));
//Seteamos ejs como motor de vistas
app.set('view engine', 'ejs');
//Seteamos carpeta de archivos estaticos
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cargamos las rutas


app.use('/admin', require('./routes/admin.router'))



// exportamos este módulo para poder usar la constiable app fuera de este archivo
module.exports = app;