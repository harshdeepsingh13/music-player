const express = require('express');
const {registerUserController, loginUserController} = require("./controller");

const app = express.Router();

app.post("/register", registerUserController);
app.post("/login", loginUserController);

module.exports = app;
