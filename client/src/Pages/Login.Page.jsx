import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import login_back from "../assets/Login_Back.jpg";
import { isAuthenticated, login, setToken } from "../Service/auth.service";
import { useDispatch } from "react-redux";
import { getLogUserData } from "../Store/Main/action";
import { useNavigate } from "react-router-dom";
import ToasterMessage from "../Components/Alart";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [alertObject, setAlertObject] = useState({
    state: false,
    type: "",
    message: "",
  });
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigateTo("/home");
    } 
  }, []);

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (credentials.username === "" || credentials.password === "") {
      setAlertObject({
        state: true,
        type: "warning",
        message: "Please fill in all the fields",
      })
      return;
    }

    // console.log(
    //   `Login Done userName is ${credentials.username} and password is ${credentials.password}`
    // );

    login(credentials)
      .then((res) => {
        setToken(JSON.stringify(res.data));
        dispatch(getLogUserData());
        navigateTo("/home");
      })
      .catch((error) => {
        if(error.response == undefined){
          setAlertObject({
            state: true,
            type: "error",
            message: error.message,
          })
        }else{
          setAlertObject({
            state: true,
            type: "error",
            message: error.response.data.message,
          })
        }
      });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 0,
          justifyContent: "center",
          backgroundImage: `url(${login_back})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          sx={{
            width: "30vw",
            height: 520,
            backgroundColor: "#fff",
            padding: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleLogin}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
      {alertObject.state && (
        <ToasterMessage data={alertObject} setData={setAlertObject} />
      )}
    </>
  );
};

export default Login;
