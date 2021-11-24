const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
const User = require("../models/User.model");

const { isBusiness } = require("../utils");

/* GET home page */
router.get("/", (req, res) => {
  console.log(req.session.currentUser)
  Cyber.find()
    .then((cyber) => {
      if (req.session.currentUser) {
        res.render("index", { isBusiness: isBusiness(req.session.currentUser), cyber });
        return
      }
      res.render("index", { cyber });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
