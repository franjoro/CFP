
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const participantes = require('../controllers/participantes.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores

// router /admin/participantes/
router.get("/",  participantes.main);
// router /admin/participantes/table
router.get("/table",  participantes.loadTable);
// router /admin/participantes/get/:dui
router.get("/get/:dui?",  participantes.getByDUI);
// router /admin/participantes/add
router.post("/add",  participantes.add);
// router /admin/participantes/edit
router.put("/edit",  participantes.edit);








// Exportamos la configuración
module.exports = router;