const router = require("express").Router();
const Cyber = require("../models/Cyber.model");

router.get("/create-new-cyber", (req, res) => res.render("bussines/new-cyber"));

router.post("/create-new-cyber", (req, res) => {
  //   let location = {
  //     type: "Point",
  //     coordinates: [req.body.lng, req.body.lat],
  //   };
  const { name, description } = req.body;
  Cyber.create({ name, description })
    .then((place) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("/");
      console.log(err);
    });
});

module.exports = router;
