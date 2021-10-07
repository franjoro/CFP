const nodemailer = require("nodemailer");
require('dotenv').config();

// email sender function
mailer = {};

//
const passEmail = process.env.PASSEMAIL;

// Definimos el transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "soporte_cfp@ricaldone.edu.sv",
    pass: `${process.env.PASSEMAIL}`,
  },
});
mailer.sendEmail = (to, sub, html = "", text) => {
  // Definimos el email
  const mailOptions = {
    from: "soporte_cfp@ricaldone.edu.sv",
    to: to || "osmaro_bonilla@ricaldone.edu.sv",
    subject: sub || "",
    text: text || "",
    html
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent");
      return true;
    }
  });
};

module.exports = mailer;
