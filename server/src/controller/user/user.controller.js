const { getAllUser } = require("../../model/user/user.model");

async function httpGetAllUser(req, res) {
  const result = await getAllUser();

  if (result.statues == "success") {
    return res
      .status(200)
      .send({ type: "Success", massage: "", data: result.results });
  } else {
    return res
      .status(500)
      .send({ type: "Error", massage: "Something Went Wrong" });
  }
}

module.exports = { httpGetAllUser };
