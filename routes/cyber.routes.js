const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
const User = require("../models/User.model");

const { isLoggedIn,isOwn } = require("../middlewares");
const { isOwner } = require("../utils");

router.get("/", isLoggedIn, (req, res) => {
  Cyber.find()
    .then((AllCybers) => {
      res.render("cybers/cybers", { AllCybers });
    })
    .catch((err) => console.log(err));
});

router.get("/create-new-cyber", isLoggedIn, (req, res) =>
  res.render("bussines/new-cyber")
);

router.post("/create-new-cyber", isLoggedIn, (req, res) => {
  let location = {
    type: "Point",
    coordinates: [req.body.lat, req.body.lng],
  };

  const { location_name, name, description, owner } = req.body;
  let data = {};

  description.length === 0
    ? (data = { location, location_name, name, owner })
    : (data = { location, location_name, name, description, owner });

  Cyber.create(data)
    .then((cyber) => {
      res.redirect(`details-cyber?id=${cyber.id}`);
      req.app.locals.cyber.push(cyber);
    })
    .catch((err) => {
      res.render("/");
      console.log(err);
    });
});

router.get("/details-cyber", isLoggedIn, (req, res, next) => {
  const { id } = req.query;
  Cyber.findById({ _id: id })
    .then((cyber) =>
      {
        User.findById(cyber.owner).then((owner) =>{
          res.render("cybers/cyber-details", {
          isOwner: isOwner(owner, req.session.currentUser),
          cyber,
        })
      })
    }
    )
    .catch((err) => next(err));
});

router.get("/edit", isLoggedIn, (req, res) => {
  const cyberId = req.query.id;
  Cyber.findById(cyberId).then((cyber) => {
    console.log(cyber)
    res.render("cybers/cyber-edit", { cyber });
  });
});

router.post("/:id/edit", isLoggedIn, (req, res) => {
  const cyberId = req.params.id;
  let location = {
    type: "Point",
    coordinates: [req.body.lat, req.body.lng],
  };
  const { location_name, name, description, owner } = req.body;
  Cyber.findByIdAndUpdate(cyberId, {
    location,
    location_name,
    name,
    description,
    owner,
  }).then((cyber) => {
    res.redirect("/cyber");
  });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
  const cyberId = req.params.id;
  Cyber.findByIdAndDelete(cyberId).then((cyber) => {
    res.redirect("/cyber");
  });
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
