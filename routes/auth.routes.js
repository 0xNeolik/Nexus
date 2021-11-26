const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User.model");

const transporter = require("../config/nodemailer.config");



const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn } = require("../middlewares/index");
const { isOwner } = require("../utils");


// Signup
router.get("/signup", (req, res) => res.render("auth/signup"));
router.post("/signup", (req, res) => {
  const { name, email, password, subject, message } = req.body;


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

    // transporter
    //   .sendMail({
    //     from: '"Nexus Sign Up" <Nexus-Cyber@hotmail.com>',
    //     to: `${email}`,
    //     subject: `${subject}`,
    //     text: `${message}`,
    //     html: `<b>${message}</b>`,
    //   })
    //   .then((info) => res.redirect("/"))
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

router.get("/edit", isLoggedIn, (req, res) => {
  const userID = req.query.id;
  User.findById(userID)
    .then((user) => {
      res.render("auth/user-edit", { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/edit", isLoggedIn, fileUploader.single("new-image"), (req, res) => {
  const userID = req.params.id;
  const { name, description, existingImage } = req.body;

  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    image = existingImage;
  }

  User.findByIdAndUpdate(userID, { name, description, image }, { new: true })
    .then((user) => {
      req.session.currentUser = user;
      req.app.locals.user = req.session.currentUser;
      res.redirect(`/auth/${userID}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
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

router.get("/visit/:id", isLoggedIn, (req, res) => {
  const userID = req.params.id;
  User.findById(userID)
    .then((userVisit) => {
      res.render("auth/user-profile-visit", { userVisit });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", isLoggedIn, (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  User.findById(userID)
    .then((user) => {
      res.render("auth/user-profile", {
        isOwner: isOwner(user, req.session.currentUser),
        user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
