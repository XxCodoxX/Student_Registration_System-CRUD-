const express = require("express");
const { httpGetAllUser, httpUpdateUser, httpAddNewUser, httpUserDelete } = require("../../controller/user/user.controller");

const userRouter = express.Router();

userRouter.get("/", httpGetAllUser);
userRouter.post("/add" , httpAddNewUser);
userRouter.post("/update" , httpUpdateUser);
userRouter.delete("/delete", httpUserDelete);

module.exports = userRouter;
