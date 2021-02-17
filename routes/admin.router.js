
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const admin = require('../controllers/admin.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get("/", authcheck, admin.main);
router.get("/programa", authcheck, admin.renderPrograma);
router.get("/usuarios", authcheck, admin.rendeUsuarios);
router.get("/empresas",  admin.renderEmpresas);
router.get("/instructor", admin.renderInstructor);





// Exportamos la configuración
module.exports = router;