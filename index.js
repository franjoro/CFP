// Utilizar funcionalidades del Ecmascript 6
'use strict'
//Requerimos Dotenv para variables de entorno
require('dotenv').config();
// *Cargamos el fichero app.js con la configuración de Express
const app = require('./app');
// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
const port = process.env.PORT;
app.listen(port,  () => {
    console.log("servidor corriendo en http://localhost:" + port);
})







