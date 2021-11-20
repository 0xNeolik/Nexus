const router = require("express").Router();
const Cyber = require("../models/Cyber.model");

router.get("/create-new-cyber", (req, res) => res.render("bussines/new-cyber"));

module.exports = router;
