import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const ToasterMessage = ({ data, setData }) => {
  return (
    <>
      <Snackbar
        open={data?.state}
        autoHideDuration={2000}
        onClose={() => {
          setData({
            state: false,
            type: "",
            message: "",
          });
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => {
            setData({
              state: false,
              type: "",
              message: "",
            });
          }}
          severity={data.type}
        >
          {data?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

ToasterMessage.defaultProps = {
  data: {
    state: false,
    type: "success",
    message: "",
  },
  setData:()=>{}
};

export default ToasterMessage;
