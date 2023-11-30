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

const PopCommonModel = ({ data, setData, buttonAction }) => {
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
        <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText id="alert-dialog-description">
            {`${data?.description} "${data?.username}"`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Buttons
            ButtonName={"Cancel"}
            ButtonFunction={() => {
              setData({ ...data, state: false, userId: null });
            }}
          />
          <Buttons ButtonName={data?.actionbtnName} ButtonColor={"#D70040"} ButtonFunction={buttonAction} paramsForFunction={data.userId}/>
        </DialogActions>
      </Dialog>
    </>
  );
};

PopCommonModel.defaultProps = {
  data: {},
  setData:()=>{},
  buttonAction:()=>{},
};

export default PopCommonModel;
