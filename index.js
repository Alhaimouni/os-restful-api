"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { PORT } = require("./config");
const client = require("./client");
const axios = require("axios");
const userRouter = require("./routes/user.routes");

// ================== Global Middlewares

app.use(cors());
app.use(express.json());

// ================== Routes Middlewares

app.use("/user", userRouter);

// ================== Error_Handlers Middlewares

app.use(require("./error_handlers/404"));
app.use(require("./error_handlers/500"));

client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Working at ${PORT}`);
  });
});
