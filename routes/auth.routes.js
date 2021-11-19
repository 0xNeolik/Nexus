const router = require("express").Router();
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/User.model");

// Signup
router.get("/signup", (req, res) => res.render("auth/signup"));
router.post("/signup", (req, res) => {
  const { username, userPwd } = req.body;

  if (userPwd.length === 0 || username.length === 0) {
    res.render("auth/signup-form", { errorMsg: "Rellena todos los campos" });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.render("auth/signup", { errorMsg: "Usuario ya registrado" });
        return;
      }

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userPwd, salt);

      User.create({ username, password: hashPass })
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// Login
router.get("/login", (req, res) => res.render("auth/login"));
router.post("/login", (req, res) => {
  const { username, userPwd } = req.body;

  if (userPwd.length === 0 || username.length === 0) {
    res.render("auth/login", { errorMsg: "Rellena los campos" });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      console.log(req.session.currentUser);
      if (!user) {
        res.render("auth/login", { errorMsg: "Usuario no reconocido" });
        return;
      }

      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login", { errorMsg: "Contraseña incorrecta" });
        return;
      }

      req.session.currentUser = user;
      req.app.locals.user = req.session.currentUser;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
  req.app.locals.user = false;
});

module.exports = router;
