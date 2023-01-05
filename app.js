require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors");
const morgan = require("morgan")
const client = require('./db/client');


client.connect();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());
// Setup your Middleware and API Router here

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use((req, res, next) => {
    console.log("<-----Body Logger START ----->");
    console.log(req.body);
    console.log("<-----Body Logger End");
})
module.exports = app;
