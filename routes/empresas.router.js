
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const empresas = require('../controllers/empresas.controller');
const {  } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Mandar a traer la info de la tabla
router.get("/table/:estado*?",   empresas.table);
// Mandar a traer la info del contacto según empresa
router.get("/contacto/:empresa*?",   empresas.renderContacto);
// AGregar nueva empres
router.post("/add",    empresas.add);
// Agregar nuevo contacto
router.post("/ContactoAdd",    empresas.contactoAdd);
// Editar contacto
router.post("/ContactoEditar",    empresas.contactoEditar);
// Cambiar estado
router.put("/changeEstado",    empresas.putEstado);
// Editar empresa
router.put("/editarEmpresa",    empresas.editar_empresa);
// Borrar contacto
router.delete("/DeleteContacto",  empresas.deleteContacto);
// Traer actividades economicas
router.post("/actividades", empresas.actividades);






// Exportamos la configuración
module.exports = router;