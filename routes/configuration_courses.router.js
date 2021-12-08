// name: configuration_courses.js
// description: routes for configuration courses
// dependencies: express, middlewares/auth, create,update,delete and read controllers
// create-date: 12/08/2021 for Osmaro Bonilla
// last update: 12/08/2021 for Osmaro Bonilla

// Cargamos el módulo de express para poder crear rutas
const express = require('express');
// Cargamos el controlador
const create = require('../controllers/configuration_courses/create.controller');
const remove = require('../controllers/configuration_courses/delete.controller');
const update = require('../controllers/configuration_courses/update.controller');
const read = require('../controllers/configuration_courses/read.controller');
const { authcheck } = require('../middlewares/auth');
// Llamamos al router
const router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
// Genera la vista


// route /configuration-courses/read
router.get('/read', authcheck, read.all);
// route /configuration-courses/read/:idProgram
router.get('/read/:idProgram', read.monthForProgram);
// route /configuration-courses/create
router.post('/create', authcheck,create.add);
// route configuration/courses/update
router.put('/update', update.changeMonthDocumentation);
// router configuration-courses/delete
router.put('/delete', authcheck, ()=>{});


module.exports = router;
