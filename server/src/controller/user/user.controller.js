const { getAllUserWithoutPassword, updateUser, addNewUser, deleteUser } = require("../../model/user/user.model");
const { sendResponse } = require("../../util/helper.util");

async function httpGetAllUser(req, res) {
  await getAllUserWithoutPassword().then(
    (resolve) => {
      return res
        .status(200)
        .send(sendResponse("Success","",resolve.results));
    },
    (reject) => {
      console.log(reject.error);
      return res
        .status(500)
        .send(sendResponse("Error","Something Went Wrong",[]));
    }
  );
}

async function httpAddNewUser(req, res) {
  const body = req.body

  if(!body.userName || !body.password || !body.full_name || !body.email || !body.role || !body.age || !body.phoneNo || !body.active){
    res
      .status(401)
      .send(sendResponse("Error","Payload Is Incorrect",[]));
  }

  await addNewUser(body).then(
    (resolve) => {
      return res
        .status(200)
        .send(sendResponse("Success",resolve.results,[]));
    },
    (reject) => {
      console.log(reject.error);
      return res
        .status(500)
        .send(sendResponse("Error","Something Went Wrong",[]));
    }
  )

}

async function httpUpdateUser(req, res) {
  const body = req.body.data
  const id = req.body.userId

  if(!id || !body.userName || !body.password || !body.full_name || !body.email || !body.role || !body.age || !body.phoneNo || !body.active){
    res
      .status(401)
      .send(sendResponse("Error","Payload Is Incorrect",[]));
  }

  await updateUser(id,body).then(
    (resolve) => {
      return res
        .status(200)
        .send(sendResponse("Success",resolve.results,[]));
    },
    (reject) => {
      console.log(reject.error);
      return res
        .status(500)
        .send(sendResponse("Error","Something Went Wrong",[]));
    }
  )
  
}

async function httpUserDelete(req,res) {
  const id = Number(req.query.id)

  await deleteUser(id).then(
    (resolve) => {
      return res
        .status(200)
        .send(sendResponse("Success",resolve.results,[]));
    },
    (reject) => {
      console.log(reject.error);
      return res
        .status(500)
        .send(sendResponse("Error","Something Went Wrong",[]));
    }
  )
  
}

module.exports = { httpGetAllUser, httpAddNewUser, httpUpdateUser, httpUserDelete };
