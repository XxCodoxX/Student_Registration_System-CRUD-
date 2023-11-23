const pool = require("../../config/mysql.config");

async function getAllUser() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (error, results, fields) => {
      if (error) {
        resolve({ statues: "error", error: error });
      } else {
        resolve({ statues: "success", results: results, fields: fields });
      }
    });
  });
}

async function getUserByUserName(userName) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE userName = ?",
      userName,
      (error, results, fields) => {
        if (error) {
          resolve({ statues: "error", error: error });
        } else {
          resolve({ statues: "success", results: results });
        }
      }
    );
  });
}

module.exports = { getAllUser, getUserByUserName };
