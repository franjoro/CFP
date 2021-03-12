
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const empresas = require('../controllers/empresas.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// Mandar a traer la info de la tabla
router.get("/table/:estado*?", authcheck ,  empresas.table);
// Solicitudes
router.get("/solicitudes", authcheck ,  empresas.solicitudes);
// Aprobar solicitudes
router.post("/solicitudes", authcheck ,  empresas.Aprobarsolicitudes);
// Mandar a traer la info del contacto según empresa
router.get("/contacto/:empresa*?",  authcheck ,  empresas.renderContacto);
// AGregar nueva empres
router.post("/add",    empresas.add);
// Agregar nuevo contacto
router.post("/ContactoAdd",  authcheck,  empresas.contactoAdd);
// Editar contacto
router.post("/ContactoEditar",  authcheck,  empresas.contactoEditar);
// Cambiar estado
router.put("/changeEstado", authcheck,   empresas.putEstado);
// Editar empresa
router.put("/editarEmpresa", authcheck,   empresas.editar_empresa);
// Borrar contacto
router.delete("/DeleteContacto",authcheck,  empresas.deleteContacto);
// Traer actividades economicas
router.post("/actividades", authcheck, empresas.actividades);
// Cambiar contraseña a empresa
router.put("/Password", authcheck, empresas.ChangePassword);








// Exportamos la configuración
module.exports = router;