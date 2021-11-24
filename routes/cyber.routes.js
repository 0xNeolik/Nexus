const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
const User = require("../models/User.model");

const { isLoggedIn, isOwn } = require("../middlewares");
const { isOwner } = require("../utils");

const fileUploader = require("../config/cloudinary.config");

router.get("/", isLoggedIn, (req, res) => {
  Cyber.find()
    .then((AllCybers) => {
      res.render("cybers/cybers", { AllCybers });
    })
    .catch((err) => console.log(err));
});

router.get("/create-new-cyber", isLoggedIn, (req, res) => res.render("bussines/new-cyber"));

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
      User.findById(cyber.owner).then((user)=>{
        let role = user.role;
        if(user.role === 'PLAYER'){
          role = 'BUSINESS'
          User.findByIdAndUpdate(user._id, {role}).then((user)=>{
            req.session.currentUser = user;
            req.app.locals.user = req.session.currentUser;
          })
        }
      })
      res.redirect(`details-cyber?id=${cyber.id}`);
    })
    .catch((err) => {
      res.render("/");
      console.log(err);
    });
});

router.get("/details-cyber", isLoggedIn, (req, res, next) => {
  const { id } = req.query;
  Cyber.findById({ _id: id })
    .then((cyber) => {
      User.findById(cyber.owner).then((owner) => {
        res.render("cybers/cyber-details", {
          isOwner: isOwner(owner, req.session.currentUser),
          cyber,
        });
      });
    })
    .catch((err) => next(err));
});

router.get("/edit", isLoggedIn, (req, res) => {
  const cyberId = req.query.id;
  Cyber.findById(cyberId).then((cyber) => {
    console.log(cyber);
    res.render("cybers/cyber-edit", { cyber });
  });
});

router.post("/:id/edit", isLoggedIn, fileUploader.single("new-image"), (req, res) => {
  const cyberId = req.params.id;
  let location = {
    type: "Point",
    coordinates: [req.body.lat, req.body.lng],
  };
  const { location_name, name, description, owner, existingImage } = req.body;

  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    image = existingImage;
  }
  console.log(location)
  Cyber.findByIdAndUpdate(
    cyberId,
    {
      location,
      location_name,
      name,
      description,
      owner,
      image,
    },
    { new: true }
  ).then((cyber) => {
    res.redirect("/cyber");
  })
  .catch((err) => console.log(err));
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
  Cyber.findById(cyberId)
    .then((oneCyberFromDB) => res.status(200).json({ cyber: oneCyberFromDB }))
    .catch((err) => next(err));
});

module.exports = router;
