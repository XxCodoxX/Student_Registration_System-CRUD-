import { Button } from "@mui/material";
import React from "react";

const Buttons = ({ ButtonName, ButtonColor, ButtonFunction, ButtonDisabled, paramsForFunction }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          height: "100%",
          backgroundColor: `${ButtonColor || "#0096FF"} !important`,
        }}
        onClick={() => ButtonFunction(paramsForFunction)}
        disabled={ButtonDisabled || false}
      >
        {ButtonName || ""}
      </Button>
    </>
  );
};

Buttons.defaultProps = {
  ButtonName: "",
  ButtonColor:"#0096FF",
  ButtonDisabled:false,
  paramsForFunction:null,
  ButtonFunction:() => {}
};

export default Buttons;
