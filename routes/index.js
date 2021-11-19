module.exports = (app) => {
  // Base URLS
  app.use("/", require("./basic.routes.js"));
  app.use("/auth", require("./auth.routes.js"));
};
