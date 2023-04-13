const express = require("express");
const userRoutes = require("./user");
const musicRoutes = require("./music");
const authenticate = require('../../middlewares/authentication');

const app = express.Router();

app.use("/user", userRoutes)
app.use("/music", authenticate, musicRoutes);

module.exports = app;
