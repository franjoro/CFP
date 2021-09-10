
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const dashboard = require("../controllers/dashboard.controller");
const details = require("../controllers/details/details.controller");
const createDetails = require('../controllers/details/create_details.controller');
const updateDetails = require('../controllers/details/update_details.controller');
const { authcheck } = require('../../../../../middlewares/auth');
// Llamamos al router
const router = express.Router();
//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore
router.get("/", authcheck, dashboard.main);
router.get("/formulario", authcheck, dashboard.form);
router.get("/detalles/:idStudent?", authcheck, dashboard.details);
router.get("/studentsTable", dashboard.studentsTableWithoutCadre);
router.get("/studentsWithCadre", dashboard.studentsTableWithtCadre);
router.get("/detailsStudent/:idStudent", details.detailsStudent);
router.get("/detailTable/:idStudent", details.detailsTable);
router.get("/detailPsychology/:idPsychology", details.detailPsychology);

router.post("/addDetails/:idStudent", authcheck, createDetails.addDetail);
router.put('/updatePsychology', authcheck, updateDetails.updatePsychology);

// Exportamos la configuración
module.exports = router;