const nodemailer = require("nodemailer");
require('dotenv').config();

// email sender function
mailer = {};

// Definimos el transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSEMAIL}`,
  },
});
mailer.sendEmail = (to, sub, html = "", text) => {
  // Definimos el email
  const mailOptions = {
    from: `${process.env.EMAIL}`,
    to: to || `${process.env.SECONDEMAIL}`,
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
