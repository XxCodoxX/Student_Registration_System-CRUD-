import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Buttons from "../../Buttons";
import { useSelector } from "react-redux";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PopAddEditModel = ({ data, setData, addNewFunction, editFunction }) => {
  const [fromValues, setFormValues] = useState({
    userId: "",
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "",
    age: "",
    phoneNo: "",
    active: false,
  });
  const userData = useSelector(({ main }) => main.USER_DATA);
  const handleChange = (event) => {
    setFormValues((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (data.editUser) {
      setFormValues({
        userId: data.editUser.id,
        username: data.editUser.userName,
        password: "",
        full_name: data.editUser.full_name,
        email: data.editUser.email,
        role: data.editUser.role,
        age: data.editUser.age,
        phoneNo: data.editUser.phoneNo,
        active: data.editUser.active === 1 ? true : false,
      });
    }
  }, []);

  return (
    <>
      <Dialog
        open={data.state}
        onClose={() => {
          setFormValues({
            userId: "",
            username: "",
            password: "",
            full_name: "",
            email: "",
            role: "",
            age: "",
            phoneNo: "",
            active: false,
          });
          setData({ ...data, state: false, editable: false, userId: null });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <Typography sx={{ marginBottom: 3 }}>
              {data.editable ? "Edit Details" : "Add New"}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginBottom: 10,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={fromValues.username}
                onChange={handleChange}
              />
              <TextField
                required={data.editable ? false : true}
                name="password"
                label="Password"
                type="password"
                id="password"
                value={fromValues.password}
                onChange={handleChange}
              />
              <TextField
                id="full_name"
                label="Full Name"
                name="full_name"
                type="text"
                value={fromValues.full_name}
                onChange={handleChange}
              />
              <TextField
                id="email"
                label="Email Address"
                name="email"
                type="text"
                value={fromValues.email}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel required id="demo-simple-select-label">
                  Role
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="role"
                  label="Role"
                  name="role"
                  disabled={userData.role == "viewer" ? true:false}
                  value={fromValues.role}
                  onChange={handleChange}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"viewer"}>Viewer</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="age"
                label="Age"
                name="age"
                type="number"
                value={fromValues.age}
                onChange={handleChange}
              />
              <TextField
                id="phoneNo"
                label="Phone No"
                name="phoneNo"
                type="number"
                value={fromValues.phoneNo}
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    id="active"
                    name="active"
                    checked={fromValues.active}
                    onChange={(e) => {
                      setFormValues((pre) => ({
                        ...pre,
                        active: e.target.checked,
                      }));
                    }}
                  />
                }
                label="User Active"
                required
                sx={{ display: "flex", justifyContent: "center" }}
              />
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Buttons
                ButtonName={data.editable ? "Edit" : "Add"}
                ButtonFunction={
                  data.editable
                    ? () => {
                        editFunction(fromValues);
                      }
                    : () => {
                        addNewFunction(fromValues);
                      }
                }
              />
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

PopAddEditModel.defaultProps = {
  data: {},
  setData: () => {},
  addNewFunction: () => {},
  editFunction: () => {},
};

export default PopAddEditModel;
