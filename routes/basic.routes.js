const router = require("express").Router();
const Cyber = require("../models/Cyber.model");
const User = require("../models/User.model");
const APIHandler = require ('../services/APIHandler')
const { isBusiness } = require("../utils");

const newsAPI = new APIHandler();

router.get("/", (req, res) => {

  const newsResponse = newsAPI.getFullList()
  const cyber = Cyber.find()

  Promise.all([newsResponse, cyber])
    .then(data => {
      const [newsResponse, cyber] = data

      const news = newsResponse.data.articles
      
      const navExplorer = true

      if (req.session.currentUser) {
        const cyberFiltered = cyber.filter((el) =>{
          return el.owner == req.session.currentUser._id
        })
        res.render("index", { isBusiness: isBusiness(req.session.currentUser), cyber, cyberFiltered, news, navExplorer });
        return
      }
      res.render("index", { cyber, news, navExplorer });
      return

    })
    .catch((err) => console.log(err));
});

module.exports = router;
