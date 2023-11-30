const bcrypt = require("bcrypt");
const pool = require("../../config/mysql.config");

async function getAllUserWithoutPassword() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id,userName,full_name,email,role,age,phoneNo,active FROM users ",
      (error, results, fields) => {
        if (error) {
          reject({ statues: "error", error: error });
        } else {
          resolve({ statues: "success", results: results, fields: fields });
        }
      }
    );
  });
}

async function getUserByUserName(userName) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE userName = ? AND active = 1",
      [userName],
      (error, results, fields) => {
        if (error) {
          reject({ statues: "error", error: error });
        } else {
          resolve({ statues: "success", results: results });
        }
      }
    );
  });
}

async function addNewUser(body) {
  const { username, password, full_name, email, role, age, phoneNo, active } =
    body;
  const value = [];

  return new Promise((resolve, reject) => {
    bcrypt.hash(password.toString(), 10, (error, hash) => {
      if (error) {
        reject({ statues: "error", error: error });
      } else {
        value.push(
          username.toString(),
          hash,
          full_name.toString(),
          email.toString(),
          role.toString(),
          Number(age),
          Number(phoneNo),
          Boolean(Number(active))
        );
        pool.query(
          "INSERT INTO users (userName, password, full_name, email, role, age, phoneNo, active) VALUES (?)",
          [value],
          (error, results) => {
            if (error) {
              reject({ statues: "error", error: error });
            } else {
              if (results.affectedRows == 1) {
                resolve({ statues: "success", results: "New User Added" });
              } else {
                reject({
                  statues: "error",
                  error: "SQL_Execute - Something Went Wrong",
                });
              }
            }
          }
        );
      }
    });
  });
}

async function updateUser(id, body) {
  const { username, password, full_name, email, role, age, phoneNo, active } =
    body;
  const value = [];

  return new Promise((resolve, reject) => {
    if (password == "") {
      value.push(
        username.toString(),
        full_name.toString(),
        email.toString(),
        role.toString(),
        Number(age),
        Number(phoneNo),
        Boolean(Number(active)),
        id
      );
      pool.query(
        "UPDATE users SET userName = ?, full_name = ?, email = ?, role = ?, age = ?, phoneNo = ?, active = ? WHERE users.id = ?",
        value,
        (error, results) => {
          if (error) {
            console.log(error);
            reject({ statues: "error", error: error });
          } else {
            if (results.affectedRows == 1 && results.changedRows == 1) {
              resolve({ statues: "success", results: "Update Complete" });
            } else {
              reject({
                statues: "error",
                error: "SQL_Execute - Something Went Wrong",    
              });
            }
          }
        }
      );
    } else {
      bcrypt.hash(password.toString(), 10, (error, hash) => {
        if (error) {
          reject({ statues: "error", error: error });
        } else {
          value.push(
            username.toString(),
            hash,
            full_name.toString(),
            email.toString(),
            role.toString(),
            Number(age),
            Number(phoneNo),
            Boolean(Number(active)),
            id
          );
          pool.query(
            "UPDATE users SET userName = ?, password = ?, full_name = ?, email = ?, role = ?, age = ?, phoneNo = ?, active = ? WHERE users.id = ?",
            value,
            (error, results) => {
              if (error) {
                reject({ statues: "error", error: error });
              } else {
                if (results.affectedRows == 1 && results.changedRows == 1) {
                  resolve({ statues: "success", results: "Update Complete" });
                } else {
                  reject({
                    statues: "error",
                    error: "SQL_Execute - Something Went Wrong",   
                  });
                }
              }
            }
          );
        }
      });
    }
  });
}

async function deleteUser(id) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET active = 0 WHERE users.id = ?",
      id,
      (error, results) => {
        if (error) {
          reject({ statues: "error", error: error });
        } else {
          if (results.affectedRows == 1 && results.changedRows == 1) {
            resolve({ statues: "success", results: "Delete Completed" });
          } else {
            reject({
              statues: "error",
              error: "SQL_Execute - Something Went Wrong",
            });
          }
        }
      }
    );
  });
}

module.exports = {
  getAllUserWithoutPassword,
  getUserByUserName,
  addNewUser,
  updateUser,
  deleteUser,
};
