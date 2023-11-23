const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes/api");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use('/v1',api);

module.exports = app;
