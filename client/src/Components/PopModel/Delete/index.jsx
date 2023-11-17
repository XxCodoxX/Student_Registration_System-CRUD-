import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Buttons from "../../Buttons";

const PopDeleteModel = ({ data, setData }) => {
  console.log(data);
  return (
    <>
      <Dialog
        open={data.state}
        onClose={() => {
          setData({ ...data, state: false, userId: null });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Delete"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText id="alert-dialog-description">
            {`Do you want delete "${data.userName}"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Buttons
            ButtonName={"Cancel"}
            ButtonFunction={() => {
              setData({ ...data, state: false, userId: null });
            }}
          />
          <Buttons ButtonName={"Delete"} ButtonColor={"#D70040"} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopDeleteModel;
