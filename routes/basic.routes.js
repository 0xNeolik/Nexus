const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
/* GET home page */
router.get("/", (req, res) => {
  Cyber.find()
    .then((cyber) => {
      res.render("index", { cyber });
    })
    .catch((err) => console.log(err));
});


module.exports = router;
