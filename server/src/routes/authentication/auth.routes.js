const express = require("express");
const { httpUserLogin, httpNewAccessToken } = require("../../controller/authentication/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", httpUserLogin );
authRouter.post("/token", httpNewAccessToken);

module.exports = authRouter;  