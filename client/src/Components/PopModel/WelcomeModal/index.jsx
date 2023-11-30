import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WelcomeModal = ({ data, setData }) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={data.state}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={data.state}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {data.message}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

WelcomeModal.defaultProps = {
    data: {
      state: false,
      message: "",
    },
    setData:()=>{}
  };

export default WelcomeModal;
