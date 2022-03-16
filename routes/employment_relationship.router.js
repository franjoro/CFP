/*
nameclass: employment_relationship
description: route for wmployment relationship
dependencies: express, middlewares/auth authcheck, router express,
date: 03/11/2021 for OsmaroBonilla
lastupdate: 03/11/2021 for OsmaroBonilla
*/
const express = require('express');
const { authcheck } = require('../middlewares/auth');
const router = express.Router();
const fileUpload = require("express-fileupload");// proteccion para fileUpload
// CONTROLLERS SECTION
const renderController = require('../controllers/employment_relationship/render.controller');
const readController = require('../controllers/employment_relationship/read.controller');
const createRelationShipController = require("../controllers/employment_relationship/createRelationShipController");
const filesController = require("../controllers/employment_relationship/files.controller");
const updateController = require("../controllers/employment_relationship/update.controller");

// GET SECTION

// route: "/admin/vinculacion-laboral/menu"
router.get("/menu", authcheck, renderController.menu);
// route: "/admin/vinculacion-laboral/detalle/:idStudent?"
router.get("/detalle/:idStudent?", authcheck, renderController.detail)
// route: "/admin/vinculacion-laboral/documentacion/:idStudent"
router.get("/documentacion/:idStudent", authcheck, renderController.documentation);

// TABLES SECTION

// route: "/admin/vinculacion-laboral/tb-students/"
router.get("/tb-students",authcheck, readController.tbStudents);

// route: "/admin/vinculacion-laboral/update-name-document"
router.put("/update-name-document", authcheck, updateController.updateNameDocument);

// "admin/vinculacion-laboral/send-files/"
router.post("/send-files", fileUpload(), filesController.sendFile);
// route: "/admin/vinculacion-laboral/add-workshop"
router.post("/add-workshop", authcheck, createRelationShipController.addWorkShop);

// "/admin/vinculacion-laboral/delete-file"
router.delete("/delete-file", authcheck, filesController.deleteFile);

module.exports = router;