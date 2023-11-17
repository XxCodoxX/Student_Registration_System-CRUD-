import React, { useRef } from "react";
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

const Login = () => {
  const credentials = useRef({
    email: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      credentials.current.email === "" ||
      credentials.current.password === ""
    ) {
      console.log("Please fill all the fields");
      return;
    }

    console.log(`Login Done userName is ${credentials.current.email} and password is ${credentials.current.password}`);
    
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> credentials.current.email = e.target.value}
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
              onChange={(e)=> credentials.current.password = e.target.value}
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
    </>
  );
};

export default Login;
