require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const client = require("./db/client");

client.connect();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());
// Setup your Middleware and API Router here

const apiRouter = require("./api");
app.use("/api", apiRouter);

app.use((req, res, next) => {
  console.log("<-----Body Logger START ----->");
  console.log(req.body);
  console.log("<-----Body Logger End ----->");
});

app.get("*", (req, res) => {
  res.status(404);
  next({
    name: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  console.log({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
