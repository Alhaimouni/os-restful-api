"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { PORT } = require("./config");
const client = require("./client");
const userRouter = require("./routes/user.routes");
const weatherRouter = require("./routes/weather.routes");

// ================== Global Middlewares

app.use(cors());
app.use(express.json());

// ================== Routes Middlewares

app.use("/user", userRouter);
app.use("/weather", weatherRouter);

// ================== Welcoming Route

app.get('/',(req,res)=>{
  res.status(200).json(`
  Welcome to opensooq stask resful API.
  Routes :
    {
    method: POST
    url: https://opensooq-web-api.onrender.com/user/signup  => to create new user
    bodyexample :{
      "email": "user@user.com",
      "password": "user"
    }
  },
  {
    method: POST
    url: https://opensooq-web-api.onrender.com/user/login  => login 
    header :  basic-auth
  },
  {
    method: GET
    url: https://opensooq-web-api.onrender.com/weather?lon=-179&lat=90  => get all data based on cordination
  },
  {
    method: GET
    url: https://opensooq-web-api.onrender.com/weather/fav  => get all fav data for the connected user
  },
  {
    method: GET
    url: https://opensooq-web-api.onrender.com/weather/fav  => admin route to get all fav data 
  },
  {
    method: POST
    url: https://opensooq-web-api.onrender.com/weather/fav  => add to fav
    bodyexample :{
      "weather": "fire",
      "visibility": "12000",
      "comment": "oman-city"
  }
  },
  {
    method: DELETE
    url: https://opensooq-web-api.onrender.com/weather/fav/id => delete fav record by the connected user
  },
  {
    method: DELETE
    url: https://opensooq-web-api.onrender.com/weather/fav/admin/id => delete fav record by the admin
  },{
    method: PUT
    url: https://opensooq-web-api.onrender.com/weather/fav/id => update the selected fav comment by the admin
    bodyexample:{
      "comment":"add the comment"
  }
  }`)
})
// ================== Error_Handlers Middlewares

app.use(require("./error_handlers/404"));
app.use(require("./error_handlers/500"));

client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Working at ${PORT}`);
  });
});
