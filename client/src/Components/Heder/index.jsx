import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import PopCommonModel from "../PopModel/CommonModal";
import { logout } from "../../Service/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetMainStor } from "../../Store/Main/action";

const Heder = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modelLogoutState, setModelLogoutState] = useState({
    state: false,
    userId: null,
    username: "",
    title: "User Logout",
    description: "Do you want Logout",
    actionbtnName: "Logout",
  });
  const userData = useSelector(({ main }) => main.USER_DATA);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandle = () => {
    setModelLogoutState((pre) => ({
      ...pre,
      state: true,
      userId:  null,
      username:  userData.userName,
    }));
    setAnchorEl(null);
  };

  const logoutFunction = ()=> {

    logout()
    dispatch(resetMainStor())
    
    setModelLogoutState((pre) => ({
      ...pre,
      state: false,
      userId:  null,
      userName:  "",
    }));

    navigateTo("/")
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#000" }}
          >
            Student Registration System
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle sx={{ color: "#000", fontSize: 40 }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logoutHandle}>LogOut</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {modelLogoutState.state && (
        <PopCommonModel data={modelLogoutState} setData={setModelLogoutState} buttonAction={logoutFunction}/>
      )}
    </>
  );
};

export default Heder;
