// name: create_controller_frequence_questions.js
// description: controller create frecuqnce questions
// dependencies: pool, create
// create-date: 12/14/2021 for Osmaro Bonilla
// last update: 12/14/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const create = {};


create.add = (req,res)=>{
    try {
        const {
            question,
            answer,
            idProgram
        } = req.body;
        if(!idProgram){
            return(res.status(400).json({'error': "empty_program"}));
        }
        if(!answer){
            return(res.status(400).json({'error': "empty_answer"}));
        }
        if(!question){
            return(res.status(400).json({'error': "empty_question"}));
        }
        pool.query('INSERT INTO tb_frequent_questions (question, answer, id_program) VALUES (?,?,?)',[question,answer,idProgram]).then(
            (response)=>{
                res.send(response);
            }
        )
    } catch (error) {
        return(res.send(error));
    }

};

module.exports = create;

