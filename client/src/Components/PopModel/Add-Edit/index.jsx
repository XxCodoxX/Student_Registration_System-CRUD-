import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Buttons from "../../Buttons";

const PopAddEditModel = ({ data, setData }) => {
  console.log(data);
  return (
    <>
      <Dialog
        open={data.state}
        onClose={() => {
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
            <div style={{ display: "flex", flexDirection: "column", gap: 20,marginBottom:10 }}>
              <TextField required id="name" label="Name" name="name" type="text" />
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                type="text"
              />
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                id="age"
                label="Age"
                name="age"
                type="number"
              />
              <TextField
                required
                id="phNo"
                label="Phone No"
                name="phNo"
                type="number"
              />
            </div>
            <Divider/>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
              <Buttons ButtonName={data.editable ? "Edit" : "Add"}/>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopAddEditModel;
