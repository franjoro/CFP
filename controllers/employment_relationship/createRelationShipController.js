/*
name: create controller relation ship
description: create diferents tables in system relation ship
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 26/11/2021 for OsmaroBonilla
last-update: 26/11/2021 for OsmaroBonilla
*/

const pool = require("../../models/db");

const createRelationShipController = {};


createRelationShipController.addWorkShop = async (req, res)=>{
    // recolect req.body
    const {
        date, 
        theme, 
        cv, 
        personalAdvice, 
        status, 
        idStudent
    } = req.body;

    if(!date)
        return res.status(400).json({"error": "empty_date"});
    if(!theme)
        return res.status(400).json({"error": "empty_theme"});
    if(!status)
        return res.status(400).json({"error": "empty_status"});
    if(!idStudent)
        return res.status(400).json({"error": "empty_student"});
    try {
        await pool.query("INSERT INTO tb_er_workshops(date, theme, cv_aws_key, personal_advice, status, id_student) VALUES (?,?,?,?,?,?);",
        [date, theme, cv, personalAdvice, status, idStudent]);
    } catch (error) {
        
    }
};


module.exports =  createRelationShipController;