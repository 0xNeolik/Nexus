module.exports = (app) => {
  // Base URLS
  app.use("/", require("./basic.routes.js"));
  app.use("/auth", require("./auth.routes.js"));
  app.use("/cyber", require("./cyber.routes.js"));
  app.use("/email", require("./email.routes.js"));
};
