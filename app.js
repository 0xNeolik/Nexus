require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

const hbs = require("hbs");

require("./config")(app);

app.locals.title = `Created with IronLauncher`;

app.locals.user = undefined;

app.locals.cyber = [];

app.locals.keymaps = process.env.APIMAPS;

require("./config/session.config")(app);

require("./routes")(app);

require("./error-handling")(app);

module.exports = app;
