
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const login = require('../controllers/login.controller');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
const {CloseSession} = require("../middlewares/auth");



router.get("/", CloseSession , login.renderIndex);
router.post("/signin", login.signin);
router.get("/signout", login.signout);





// Exportamos la configuración
module.exports = router;