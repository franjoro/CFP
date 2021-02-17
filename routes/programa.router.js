
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
const fileUpload = require('express-fileupload');
// Cargamos el controlador
const programa = require('../controllers/programa.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores




router.get("/id+:id", authcheck , programa.renderTablaUnion);
router.get("/table", authcheck, programa.loadTable);
router.post("/add", authcheck, fileUpload(),  programa.addPrograma);
router.post("/EncargadoAdd",authcheck,programa.addEncargado);
router.delete("/deleteinstructor", authcheck ,programa.deleteinstructor);
router.put("/updateprograma", authcheck,programa.updatePrograma)





// Exportamos la configuración
module.exports = router;