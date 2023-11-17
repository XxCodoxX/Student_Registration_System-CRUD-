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
import React, { useState } from "react";
import Heder from "../Components/Heder";
import Buttons from "../Components/Buttons";
import PopAddEditModel from "../Components/PopModel/Add-Edit";
import PopDeleteModel from "../Components/PopModel/Delete";

const Home = () => {
  const [modelAddEditState, setModelAddEditState] = useState({
    state: false,
    editable: false,
    userId: null,
  });
  const [modelDeleteState, setModelDeleteState] = useState({
    state: false,
    userId: null,
    userName: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      userId: dataPack.id || null,
    }));
  };

  const deleteClick = (dataPack) => {
    setModelDeleteState((pre) => ({
      ...pre,
      state: true,
      userId: dataPack.id || null,
      userName: dataPack.name || "",
    }));
  };

  const dummyData = [
    {
      id: 1,
      name: "test1",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 2,
      name: "test2",
      email: "test2@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 3,
      name: "test3",
      email: "test3@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 4,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 5,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 6,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 7,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 8,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 9,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 10,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
    {
      id: 11,
      name: "test4",
      email: "test1@test.com",
      age: 25,
      phoneNo: "0789635896",
    },
  ];

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
              <Buttons ButtonName={"Add New"} ButtonFunction={addNewClick} />
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Phone No</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.length != 0 ? (
                    dummyData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell>{data.age}</TableCell>
                          <TableCell>{data.phoneNo}</TableCell>
                          <TableCell>
                            <Buttons
                              ButtonName={"Edit"}
                              ButtonColor={"#50C878"}
                              ButtonFunction={editClick}
                              paramsForFunction={{ id: data.id }}
                            />
                          </TableCell>
                          <TableCell>
                            <Buttons
                              ButtonName={"Delete"}
                              ButtonColor={"#D70040"}
                              ButtonFunction={deleteClick}
                              paramsForFunction={{
                                id: data.id,
                                name: data.name,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      {" "}
                      <TableCell sx={{ textAlign: "center" }} colSpan={4}>
                        No Data
                      </TableCell>{" "}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={dummyData.length}
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
        />
      )}
      {modelDeleteState.state && (
        <PopDeleteModel data={modelDeleteState} setData={setModelDeleteState} />
      )}
    </>
  );
};

export default Home;
