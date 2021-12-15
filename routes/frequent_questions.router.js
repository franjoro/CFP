// name: frequent_questions.router.js
// description: router for management table tb_frequent_questions
// dependencies: express middlewares/auth
// start_date: 12/15/2021
// last_update: 12/15/2021

// module express init
const express = require('express');
// create controller
const create = require('../controllers/frequent_questions/create.controller');
const read = require('../controllers/frequent_questions/read.controller');
const remove = require('../controllers/frequent_questions/delete.controller');
const update = require('../controllers/frequent_questions/update.controller');
const { authcheck } = require('../middlewares/auth');
// call router
const router = express.Router();

// routeget
//route /frequent-questions/find-for-program (select in tb_frequet_questions)
router.get("/find-for-program/:idProgram", read.findForProgram);
router.get("/find-for-id/:id", authcheck, read.findForId);
// route post
//route /frequent-questions/add (for create in tb_frequent_questions)
router.post("/add", authcheck ,  create.add);
// router put 
//route /frequent-questions/update
router.put("/update", authcheck, update.update);
// route delete
// route frequent-questions/delete (delete for tb_frequent_questions)
router.delete("/delete", authcheck, remove.delete);



// Exportamos la configuración
module.exports = router;