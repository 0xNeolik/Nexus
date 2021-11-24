const router = require("express").Router();

const transporter = require("../config/nodemailer.config");
const { isLoggedIn } = require("../middlewares/index");

router.get("/send-email-signup", isLoggedIn, (req, res) => {
  let { email, subject, message } = req.body;

  transporter
    .sendMail({
      from: '"Nexus Sign Up" <Nexus-Cyber@hotmail.com>',
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

router.get("/send-email-book", isLoggedIn, (req, res) => {
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
