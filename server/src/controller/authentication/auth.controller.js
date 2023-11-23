const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserByUserName } = require("../../model/user/user.model");

function generateAccessToken(user) {
  return jwt.sign({ userName: user }, process.env.JWT_AUTH_TOKEN, {
    expiresIn: process.env.JWT_AUTH_TOKEN_EXPTIME,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userName: user }, process.env.JWT_AUTH_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_AUTH_REFRESH_TOKEN_EXPTIME,
  });
}

async function httpUserLogin(req, res) {
  const { username, password } = req.body;
  const result = await getUserByUserName(username);
  if (result.statues == "success") {
    if (result.results.length > 0) {
      bcrypt.compare(
        password.toString(),
        result.results[0].password,
        (error, response) => {
          if (error) {
            return res
              .status(500)
              .send({ type: "Error", massage: "Something Went Wrong" });
          } else if (response) {
            const authToken = generateAccessToken(
              result.results[0].userName.toString()
            );
            const refreshToken = generateRefreshToken(
              result.results[0].userName.toString()
            );
            return res
              .status(200)
              .send({ AccessToken: authToken, RefreshToken: refreshToken });
          } else {
            return res.status(401).send({
              type: "Error",
              massage: "User Name Or Password are Incorrect",
            });
          }
        }
      );
    } else {
      return res
        .status(401)
        .send({ type: "Error", massage: "User Doesn't Exist" });
    }
  } else {
    return res
      .status(500)
      .send({ type: "Error", massage: "Something Went Wrong" });
  }
}

module.exports = { httpUserLogin };
