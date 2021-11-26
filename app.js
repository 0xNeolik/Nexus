require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

const hbs = require("hbs");

require("./config")(app);

require("./config/session.config")(app);

require("./routes")(app);

require("./error-handling")(app);

app.locals.title = `Created with IronLauncher`;

app.locals.user = undefined;


app.locals.keymaps = process.env.APIMAPS;

app.locals.keynews =  process.env.APINEWS;

module.exports = app;
