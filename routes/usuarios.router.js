
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const usuarios = require('../controllers/usuarios.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores



router.post("/edit",   authcheck, usuarios.editUsuario);
router.post("/add", authcheck, usuarios.addUsuario);
router.get("/table", authcheck, usuarios.loadTable);



// Exportamos la configuración
module.exports = router;