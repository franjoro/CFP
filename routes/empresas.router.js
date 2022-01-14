
// cargue express
const express = require('express');
// adjunt enterprise controller
const empresas = require('../controllers/empresas.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();

// Mandar a traer la info de la tabla "/admin/empresas/table/:estado"
router.get("/table/:estado*?", authcheck ,  empresas.table);
// Solicitudes "/admin/empresas/solicitudes"
router.get("/solicitudes", authcheck ,  empresas.solicitudes);
// Aprobar solicitudes "/admin/empresas/solicitudes"
router.post("/solicitudes", authcheck ,  empresas.Aprobarsolicitudes);
// Mandar a traer la info del contacto según empresa "/admin/empresas/contacto/:empresa"
router.get("/contacto/:empresa*?",  authcheck ,  empresas.renderContacto);
// AGregar nueva empres "/admin/empresas/add"
router.post("/add",    empresas.add);
// "/admin/empresas/addAll"
router.post("/addAll", authcheck, empresas.addAll);
// Agregar nuevo contacto "/admin/empresas/ContactoAdd"
router.post("/ContactoAdd",  authcheck,  empresas.contactoAdd);
// Editar contacto "/admin/empresas/ContactoEditar"
router.post("/ContactoEditar",  authcheck,  empresas.contactoEditar);
// Cambiar estado "/admin/empresas/changeEstado"
router.put("/changeEstado", authcheck,   empresas.putEstado);
// Editar empresa "/admin/empresas/editarEmpresa"
router.put("/editarEmpresa", authcheck,   empresas.editar_empresa);
// Borrar contacto "/admin/empresas/DeleteContacto"
router.delete("/DeleteContacto",authcheck,  empresas.deleteContacto);
// Traer actividades economicas ""/admin/empresas/actividades"
router.post("/actividades", authcheck, empresas.actividades);
// Cambiar contraseña a empresa "/admin/empresas/Password"
router.put("/Password",  empresas.ChangePassword);
// "/admin/empresas/read-id"
router.get('/read-id', authcheck, empresas.readId);








// Exportamos la configuración
module.exports = router;