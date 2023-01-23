const express = require("express");
const userRoutes = require("./user");

const app = express.Router();

app.use("/user", userRoutes)

module.exports = app;
