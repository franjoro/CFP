// name: delete_controller_frequence_questions.js
// description: controller delete frecuqnce questions
// dependencies: pool
// create-date: 12/14/2021 for Osmaro Bonilla
// last update: 12/14/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const update = {};


update.update = (req,res)=>{
    try {
        const {
            question,
            answer,
            idFQ
        } = req.body;
        if(!idFQ){
            return(res.status(400).json({'error': "empty_program"}));
        }
        if(!answer){
            return(res.status(400).json({'error': "empty_answer"}));
        }
        if(!question){
            return(res.status(400).json({'error': "empty_question"}));
        }
        pool.query('UPDATE tb_frequent_questions SET question = ?, answer = ? WHERE id = ?;',[question,answer,idFQ]).then(
            (response)=>{
                res.send(response);
            }
        )
    } catch (error) {
        return(res.send(error));
    }

};

module.exports = update;

