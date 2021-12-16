// name: problem_cases.router.js
// description: router for management table tb_problem_cases and tb_problem_cases_imgs
// dependencies: express middlewares/auth and (create,update,read,delete controllers)
// start_date: 12/15/2021 for Osmaro Bonilla
// last_update: 12/15/2021 for Osmaro Bonilla

// module express init
const express = require('express');
// create controller
const create = require('../controllers/problem_cases/create.controller');
const read = require('../controllers/problem_cases/read.controller');
const { authcheck } = require('../middlewares/auth');
// call router
const router = express.Router();


//route /problem-cases/add (for create in tb_frequent_questions)
router.post("/add", create.add);
// route "/problem-cases/find-for-program"
router.get("/find-for-program/:idProgram", authcheck, read.findForProgram);

// Exportamos la configuración
module.exports = router;