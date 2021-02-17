
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const ins = require('../controllers/ins.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores


router.get("/table/:estado?*", ins.table);
router.put("/changeEstado", ins.changeEstado);
router.put("/editar", ins.editar);
router.post("/add", ins.add);






// Exportamos la configuración
module.exports = router;