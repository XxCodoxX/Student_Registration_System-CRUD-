const express = require("express");
const { httpUserLogin, httpNewAccessToken, httpGetLogUser } = require("../../controller/authentication/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", httpUserLogin );
authRouter.post("/token", httpNewAccessToken);
authRouter.get("/logUser", httpGetLogUser);

module.exports = authRouter;  