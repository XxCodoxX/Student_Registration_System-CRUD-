const express = require("express");
const { httpGetAllUser } = require("../../controller/user/user.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);

module.exports = userRouter;
