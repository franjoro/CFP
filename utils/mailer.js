const nodemailer = require("nodemailer");
// email sender function
mailer = {};
// Definimos el transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "soporte_cfp@ricaldone.edu.sv",
    pass: "Ricaldone_21",
  },
});
mailer.sendEmail = (to, sub, html = "", text) => {
  // Definimos el email
  const mailOptions = {
    from: "soporte_cfp@ricaldone.edu.sv",
    to: to || "franklin_lopez@ricaldone.edu.sv",
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
