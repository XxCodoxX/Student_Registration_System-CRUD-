const express = require("express");
const { httpUserLogin } = require("../../controller/authentication/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", httpUserLogin );
// authRouter.get("/token", );

module.exports = authRouter;