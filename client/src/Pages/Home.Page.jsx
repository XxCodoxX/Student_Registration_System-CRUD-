import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Heder from "../Components/Heder";
import Buttons from "../Components/Buttons";
import PopAddEditModel from "../Components/PopModel/Add-Edit";
import PopCommonModel from "../Components/PopModel/CommonModal";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Service/auth.service";
import { useSelector } from "react-redux";
import {
  addNewUsersApi,
  deleteUsersApi,
  editUsersApi,
  getAllUsersApi,
} from "../api/UserApi";
import ToasterMessage from "../Components/Alart";
import WelcomeModal from "../Components/PopModel/WelcomeModal";

const Home = () => {
  const [modelAddEditState, setModelAddEditState] = useState({
    state: false,
    editable: false,
    editUser: null,
  });
  const [modelDeleteState, setModelDeleteState] = useState({
    state: false,
    userId: null,
    username: "",
    title: "User Delete",
    description: "Do you want delete",
    actionbtnName: "Delete",
  });
  const [alertObject, setAlertObject] = useState({
    state: false,
    type: "",
    message: "",
  });
  const [welcomeObject, setWelcomeObject] = useState({
    state: true,
    message: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const userData = useSelector(({ main }) => main.USER_DATA);

  const navigateTo = useNavigate();

  const addNewClick = () => {
    setModelAddEditState((pre) => ({
      ...pre,
      state: true,
    }));
  };

  const editClick = (dataPack) => {
    setModelAddEditState((pre) => ({
      ...pre,
      state: true,
      editable: true,
      editUser: dataPack || null,
    }));
  };

  const deleteClick = (dataPack) => {
    setModelDeleteState((pre) => ({
      ...pre,
      state: true,
      userId: dataPack.id || null,
      username: dataPack.full_name || "",
    }));
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getAllUsersApi();
      setAllUsers(data.data);
    } catch (error) {
      if (error.response == undefined) {
        setAlertObject({
          state: true,
          type: "error",
          message: error.message,
        });
      } else {
        setAlertObject({
          state: true,
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  const addNewFunction = async (newData) => {
    const { username, password, full_name, email, role, age, phoneNo, active } =
      newData;

    if (!username || !password || !role || !active) {
      setAlertObject({
        state: true,
        type: "warning",
        message: "need to fill Required felids",
      });
      return;
    }

    const body = {
      username: username,
      password: password,
      full_name: full_name,
      email: email,
      role: role,
      age: age,
      phoneNo: phoneNo,
      active: active === true ? 1 : 0,
    };

    try {
      const response = await addNewUsersApi(body);
      setModelAddEditState((pre) => ({
        ...pre,
        state: false,
      }));
      getAllUsers();
      setAlertObject({
        state: true,
        type: "success",
        message: response.data.message,
      });
    } catch (error) {
      if (error.response == undefined) {
        setAlertObject({
          state: true,
          type: "error",
          message: error.message,
        });
      } else {
        setAlertObject({
          state: true,
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  const editFunction = async (newData) => {
    const {
      userId,
      username,
      password,
      full_name,
      email,
      role,
      age,
      phoneNo,
      active,
    } = newData;

    if (!username || !role || !active || !userId) {
      setAlertObject({
        state: true,
        type: "warning",
        message: "need to fill Required felids",
      });
      return;
    }

    const body = {
      userId: userId,
      data: {
        username: username,
        password: password,
        full_name: full_name,
        email: email,
        role: role,
        age: age,
        phoneNo: phoneNo,
        active: active === true ? 1 : 0,
      },
    };

    try {
      const response = await editUsersApi(body);
      setModelAddEditState((pre) => ({
        ...pre,
        state: false,
        editable: false,
        editUser: null,
      }));
      getAllUsers();
      setAlertObject({
        state: true,
        type: "success",
        message: response.data.message,
      });
    } catch (error) {
      if (error.response == undefined) {
        setAlertObject({
          state: true,
          type: "error",
          message: error.message,
        });
      } else {
        setAlertObject({
          state: true,
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  const deleteFunction = async (id) => {
    try {
      const response = await deleteUsersApi(id);
      setModelDeleteState({
        state: false,
        userId: null,
        username: "",
        title: "User Delete",
        description: "Do you want delete",
        actionbtnName: "Delete",
      });
      getAllUsers();
      setAlertObject({
        state: true,
        type: "success",
        message: response.data.message,
      });
    } catch (error) {
      if (error.response == undefined) {
        setAlertObject({
          state: true,
          type: "error",
          message: error.message,
        });
      } else {
        setAlertObject({
          state: true,
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("TOKEN")) {
      navigateTo("/");
    } else {
      setWelcomeObject({
        state: true,
        message: `Welcome User ${userData.full_name}`,
      });
      const welcomeTimer = setTimeout(() => {
        setWelcomeObject({
          state: false,
          message: `Welcome User ${userData.full_name}`,
        });
        console.log("done");
      }, 2000);
      const getAllUsersTimer = setTimeout(() => {
        getAllUsers();
      }, 10);
      return () => {
        clearTimeout(getAllUsersTimer);
        clearTimeout(welcomeTimer);
      };
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#464a54",
        }}
      >
        <Heder />
        <Box
          component={Paper}
          sx={{ width: "90vw", height: "85vh", marginTop: 5, padding: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                my: 2,
                justifyContent: "flex-end",
              }}
            >
              <Buttons
                ButtonName={"Add New"}
                ButtonFunction={addNewClick}
                ButtonDisabled={userData?.role === "admin" ? false : true}
              />
            </Box>
            <TableContainer
              sx={{
                height: "68vh",
              }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers.length != 0 ? (
                    allUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data.full_name}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell>{data.age}</TableCell>
                          <TableCell>{data.phoneNo}</TableCell>
                          <TableCell>
                            <Buttons
                              ButtonName={"Edit"}
                              ButtonColor={"#50C878"}
                              ButtonFunction={() => {
                                editClick(data);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Buttons
                              ButtonName={"Delete"}
                              ButtonColor={"#D70040"}
                              ButtonFunction={() => {
                                deleteClick(data);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }} colSpan={6}>
                        No Data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={allUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, n) => setPage(n)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>
      {modelAddEditState.state && (
        <PopAddEditModel
          data={modelAddEditState}
          setData={setModelAddEditState}
          addNewFunction={addNewFunction}
          editFunction={editFunction}
        />
      )}
      {modelDeleteState.state && (
        <PopCommonModel
          data={modelDeleteState}
          setData={setModelDeleteState}
          buttonAction={deleteFunction}
        />
      )}
      {alertObject.state && (
        <ToasterMessage data={alertObject} setData={setAlertObject} />
      )}
      {welcomeObject.state && (
        <WelcomeModal data={welcomeObject} setData={setWelcomeObject} />
      )}
    </>
  );
};

export default Home;
