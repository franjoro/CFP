const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'soporte_cfp@ricaldone.edu.sv',
            pass: 'Ricaldone_20'
        }
    });
// Definimos el email
const mailOptions = {
    from: 'soporte_cfp@ricaldone.edu.sv',
    to: 'franklin_lopez@ricaldone.edu.sv',
    subject: 'Asunto',
    text: 'Contenido del email'
};
// Enviamos el email
transporter.sendMail(mailOptions, (error, info)=> {
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};