// name: problem_cases.router.js
// description: router for management table tb_problem_cases and tb_problem_cases_imgs
// dependencies: express middlewares/auth and (create,update,read,delete controllers)
// start_date: 12/15/2021 for Osmaro Bonilla
// last_update: 12/15/2021 for Osmaro Bonilla

// module express init
const express = require('express');
const fileUpload = require('express-fileupload');
// create controller
const create = require('../controllers/problem_cases/create.controller');
const read = require('../controllers/problem_cases/read.controller');
const files = require('../controllers/problem_cases/send_file.controller');
const { authcheck } = require('../middlewares/auth');
const { uploadGlobal } = require("../utils/s3Folder/s3_habil");
// call router
const router = express.Router();


//route /problem-cases/add (for create in tb_frequent_questions)
router.post("/add", create.add);
// route "/problem-cases/find-for-program"
router.get("/find-for-program/:idProgram", authcheck, read.findForProgram);
// route "/problem-cases/send-file"
router.get("/send-file", fileUpload(), files.sendFile);

// Exportamos la configuración
module.exports = router;