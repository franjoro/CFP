
// Cargamos el módulo de express para poder crear rutas
const express = require('express');
//Traemos el middleware
const dashboard = require("../controllers/dashboard.controller");
const details = require("../controllers/details/details.controller");
const createDetails = require('../controllers/details/create_details.controller');
const updateDetails = require('../controllers/details/update_details.controller');
const deleteDetails = require('../controllers/details/delete_details.controller');
const psychology_pdf = require('../controllers/details/psychology_pdf.controller')
const { authcheck } = require('../../../../../middlewares/auth');
// Llamamos al router
const router = express.Router();
//SENTANCIAS RES.GET
// Creamos una ruta para los métodos que tenemos en nuestros controladore

//Routes get
//get dashboard
router.get("/", authcheck, dashboard.main);
router.get("/formulario/:idPsychology/:idStudent", authcheck, dashboard.form);
router.get("/detalles/:idStudent", authcheck, dashboard.details);
router.get("/studentsTable", dashboard.studentsTableWithoutCadre);
router.get("/studentsWithCadre", dashboard.studentsTableWithtCadre);
//get details
router.get("/detailsStudent/:idStudent", details.detailsStudent);
router.get("/detailTable/:idStudent", details.detailsTable);
router.get("/detailPsychology/:idPsychology", details.detailPsychology);
//get form
router.get('/getDetailsPsychology/:idPsychology', details.getDetailsPsychology);
//print of pdf
router.get('/printPdf/:data', psychology_pdf.pdfDetails);
router.get('/previsualizacion_pdf/:idPsychology?/:idStudent?',psychology_pdf.renderPreview);
router.get('/downloadFilePsychology', psychology_pdf.downloadFile);
//routes post
router.post("/addDetails/:idStudent", authcheck, createDetails.addDetail);
router.post("/addStrategyPsychology", authcheck, createDetails.addStrategyPsychology);
router.post("/addReasonPsychology", authcheck, createDetails.addReasonPsychology);
//route put
router.put('/updatePsychology', authcheck, updateDetails.updatePsychology);
router.put('/updatePsychologyDetail', authcheck, updateDetails.updatePsychologyDetail);
router.put('/updateStatusPsychology', authcheck, updateDetails.updateStatusPsychology);
//routes delete
router.delete('/deletePsychology', authcheck, deleteDetails.deletePsychology);
router.delete('/deleteStrategyPsychology', authcheck, deleteDetails.deleteStrategyPsychology);
router.delete('/deleteReasonPsychology', authcheck, deleteDetails.deleteReasonPsychology);



// Exportamos la configuración
module.exports = router;

