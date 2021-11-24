const nodemailer = require("nodemailer");

//2. Instrucciones: Requerimos nodemailer y creamos el transporter.
//    Recordad ocultar las claves en el .env
let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports = transporter;
