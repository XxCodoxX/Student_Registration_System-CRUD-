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
  await getUserByUserName(username).then(
    (resolve) => {
      if (resolve.results.length > 0) {
        bcrypt.compare(
          password.toString(),
          resolve.results[0].password,
          (error, response) => {
            if (error) {
              return res
                .status(500)
                .send({ type: "Error", massage: "Something Went Wrong" });
            } else if (response) {
              const authToken = generateAccessToken(
                resolve.results[0].userName.toString()
              );
              const refreshToken = generateRefreshToken(
                resolve.results[0].userName.toString()
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
    },
    (reject) => {
      console.log(reject.error);
      return res
        .status(500)
        .send({ type: "Error", massage: "Something Went Wrong" });
    }
  );
}

function httpNewAccessToken(req, res) {
  const refreshToken = req.body.RefreshToken;

  if (!refreshToken)
    return res
      .status(401)
      .json({ type: "Error", message: "Refresh token is required" });

  jwt.verify(refreshToken, process.env.JWT_AUTH_REFRESH_TOKEN, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ type: "Error", message: "Token expired" });
      } else {
        return res
          .status(403)
          .json({ type: "Error", message: "Invalid token" });
      }
    }

    const accessToken = generateAccessToken(user.userName);
    res.status(200).json({ AccessToken: accessToken });
  });
}

module.exports = { httpUserLogin, httpNewAccessToken };
