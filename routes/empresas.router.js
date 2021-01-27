'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var empresas = require('../controllers/empresas.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores


router.get("/table/:estado*?", authcheck, empresas.table);
router.get("/contacto/:empresa*?", authcheck, empresas.renderContacto);
router.post("/add", authcheck,  empresas.add);
router.post("/ContactoAdd", authcheck,  empresas.contactoAdd);
router.post("/ContactoEditar", authcheck,  empresas.contactoEditar);
router.put("/changeEstado",  authcheck, empresas.putEstado);
router.put("/editarEmpresa", authcheck,  empresas.editar_empresa);

router.delete("/DeleteContacto",  empresas.deleteContacto);







// Exportamos la configuración
module.exports = router;