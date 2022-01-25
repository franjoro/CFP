/*
name: update.controller
description: update controller for employment relationship
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 03/11/2021 for OsmaroBonilla
last-update: 03/11/2021 for OsmaroBonilla
*/
const pool = require("../../models/db");
const updateController = {};

//#region 
updateController.updateNameDocument = async (req, res) => {
    try {
        const {name, id} = req.body;
        const sql = `UPDATE erstudentdocuments SET name = ? WHERE id = ?`;
        await pool.query(sql,[name, id]);
      //   response
      return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = updateController;