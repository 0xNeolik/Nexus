const router = require("express").Router();
const Cyber = require("../models/Cyber.model");

router.get("/create-new-cyber", (req, res) => res.render("bussines/new-cyber"));

router.post("/create-new-cyber", (req, res) => {
  let location = {
    type: "Point",
    coordinates: [req.body.lat, req.body.lng],
  };
  console.log(req.body);
  const { location_name, name, description } = req.body;
  Cyber.create({ location, location_name, name, description })
    .then((cyber) => {
      res.redirect("/");
      req.app.locals.cyber.push(cyber);
      console.log(cyber);
    })
    .catch((err) => {
      res.render("/");
      console.log(err);
    });
});

module.exports = router;
