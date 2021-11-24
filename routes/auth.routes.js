const router = require("express").Router();
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

// Signup
router.get("/signup", (req, res) => res.render("auth/signup"));
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (password.length === 0 || email.length === 0) {
    res.render("auth/signup-form", { errorMsg: "Rellena todos los campos" });
    return;
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      res.render("auth/signup", { errorMsg: "Usuario ya registrado" });
      return;
    }

    const bcryptSalt = 10;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({ name, email, password: hashPass })
      .then(() => {
        User.findOne({ email }).then((user) => {
          console.log(req.session.currentUser);
          if (!user) {
            res.render("auth/login", { errorMsg: "Usuario no reconocido" });
            return;
          }

          if (bcrypt.compareSync(password, user.password) === false) {
            res.render("auth/login", { errorMsg: "Contraseña incorrecta" });
            return;
          }

          req.session.currentUser = user;
          req.app.locals.user = req.session.currentUser;
          res.redirect("/");
        });
      })
      .catch((err) => console.log(err));
  });
});

// Login
router.get("/login", (req, res) => res.render("auth/login"));
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (password.length === 0 || email.length === 0) {
    res.render("auth/login", { errorMsg: "Rellena los campos" });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      console.log(req.session.currentUser);
      if (!user) {
        res.render("auth/login", { errorMsg: "Usuario no reconocido" });
        return;
      }

      if (bcrypt.compareSync(password, user.password) === false) {
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

router.get("/edit", (req, res) => {
  const userID = req.query.id;
  User.findById(userID)
    .then((user) => {
      res.render("auth/user-edit", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/edit", fileUploader.single("new-image"), (req, res) => {
  const userID = req.params.id;
  const { name, description, existingImage } = req.body;

  console.log("---------------->>>>>> ", req.file); //Undefined

  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }

  User.findByIdAndUpdate(userID, { name, description, imageUrl }, { new: true })
    .then((user) => {
      req.session.currentUser = user;
      req.app.locals.user = req.session.currentUser;
      res.redirect(`/auth/${userID}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", (req, res) => {
  const userID = req.params.id;
  User.findByIdAndDelete(userID)
    .then(() => {
      req.app.locals.user = false;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  User.findById(userID)
    .then((user) => {
      res.render("auth/user-profile", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
