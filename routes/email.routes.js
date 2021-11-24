const router = require("express").Router();

const transporter = require("../config/nodemailer.config");

router.get("/send-email-book", (req, res) => {
  let { email, subject, message } = req.body;

  transporter
    .sendMail({
      from: '"Your reservation is done" <Nexus-Cyber@hotmail.com>',
      to: `${email}`,
      subject: `${subject}`,
      text: `${message}`,
      html: `<b>${message}</b>`,
    })
    .then((info) => res.redirect("/"))
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
