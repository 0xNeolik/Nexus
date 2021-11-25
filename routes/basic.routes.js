const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
const User = require("../models/User.model");

const { isBusiness,isOwnerCyber } = require("../utils");

/* GET home page */
router.get("/", (req, res) => {
  Cyber.find()
    .then((cyber) => {
      console.log(req.session.currentUser)
      if (req.session.currentUser) {
        const cyberFiltered = cyber.filter((el) =>{
          return el.owner == req.session.currentUser._id
        })
        res.render("index", { isBusiness: isBusiness(req.session.currentUser), cyber, cyberFiltered });
        return
      }
      res.render("index", { cyber });
      return
    })
    .catch((err) => console.log(err));
});

module.exports = router;
