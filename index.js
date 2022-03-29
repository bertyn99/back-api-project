// Dev comments :

const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const config = require("./config");

const apiRouter = require("./apiRoutes").router;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", apiRouter);
app.listen(config.PORT, () => {
  console.log(`Application listening on port ${config.PORT}!`);
});
