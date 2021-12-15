// name: create_controller_frequence_questions.js
// description: controller create frecuqnce questions
// dependencies: pool, create
// create-date: 12/14/2021 for Osmaro Bonilla
// last update: 12/14/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const read = {};


read.findForProgram = async(req,res)=>{
    try {
        const { idProgram } = req.params;
        if(!idProgram){
            return(res.status(400).json({'error': "empty_program"}));
        }
        const data = await pool.query('SELECT id, question, answer FROM tb_frequent_questions WHERE id_program = ?',[idProgram]);
        return res.json({data});
    } catch (error) {
        return(res.send(error));
    }

};

read.findForId = async (req,res)=>{
    try {
        const { id } = req.params;
        if(!id){
            return(res.status(400).json({'error': "empty_id"}));
        }
        const data = await pool.query('SELECT question, answer FROM tb_frequent_questions WHERE id = ?',[id]);
        return res.json(data);
    } catch (error) {
        return(res.send(error));
    }
};

module.exports = read;

