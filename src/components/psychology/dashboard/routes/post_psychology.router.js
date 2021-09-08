// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const { authcheck } = require('../../../../../middlewares/auth');
const createDetails = require('../controllers/details/create_details.controller');
// Llamamos al router
const router = express.Router();
//SENTANCIAS RES.GET

router.post("/addDetails/:idStudent", authcheck, createDetails.addDetail);

// Exportamos la configuración
module.exports = router;