const router = require("express").Router();
const Cyber = require("../models/Cyber.model");

router.get("/", (req, res) => {
  Cyber.find()
    .then((AllCybers) => {
      res.render("cybers/cybers", { AllCybers });
    })
    .catch((err) => console.log(err));
});

router.get("/create-new-cyber", (req, res) => res.render("bussines/new-cyber"));

router.post("/create-new-cyber", (req, res) => {
  let location = {
    type: "Point",
    coordinates: [req.body.lat, req.body.lng],
  };
<<<<<<< HEAD
=======

>>>>>>> 3d9272be6a8b17839cb68f826b8f57c28ef0f78f
  const { location_name, name, description } = req.body;
  let data = {};

  description.length === 0
    ? (data = { location, location_name, name })
    : (data = { location, location_name, name, description });

  Cyber.create(data)
    .then((cyber) => {
      res.redirect("/");
      req.app.locals.cyber.push(cyber);
    })
    .catch((err) => {
      res.render("/");
      console.log(err);
    });
});

router.get("/details-cyber", (req, res, next) => {
  const { id } = req.query;
  Cyber.findById({ _id: id })
    .then((cyber) => res.render("cybers/cyber-details", { cyber }))
    .catch((err) => next(err));
});

router.get("/api", (req, res, next) => {
  Cyber.find()
    .then((allCybers) => {
      res.status(200).json({ cybers: allCybers });
    })
    .catch((err) => console.log(err));
});

router.get("/api/:id", (req, res, next) => {
  let cyberId = req.params.id;
  console.log("--------->", cyberId);
  Cyber.findById(cyberId)
    .then((oneCyberFromDB) => res.status(200).json({ cyber: oneCyberFromDB }))
    .catch((err) => next(err));
});

module.exports = router;
