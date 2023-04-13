const express = require('express');
const {registerUserController, loginUserController, getUserDetailsController, updateUserDetailsController} = require("./controller");
const authenticate = require("../../../middlewares/authentication");

const app = express.Router();

app.get("/", authenticate, getUserDetailsController);
app.put("/", authenticate, updateUserDetailsController)
app.post("/register", registerUserController);
app.post("/login", loginUserController);

module.exports = app;
