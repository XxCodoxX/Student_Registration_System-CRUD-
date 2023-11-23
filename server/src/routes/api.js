const express = require("express");
const userRouter = require("./user/user.routes");
const authRouter = require("./authentication/auth.routes");
const authMiddleware = require("../middleware/auth.middleware");

const api = express.Router();

api.use("/user", authMiddleware , userRouter);
api.use("/auth", authRouter);

module.exports = api;
