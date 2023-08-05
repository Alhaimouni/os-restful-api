"use strict";
const client = require("../client");
const jwt = require("jsonwebtoken");

async function bearerAuth(req, res, next) {
  try {
    if (req.headers.authorization) {
      let bearerAuth = req.headers.authorization; // `Bearer sdasdas.sdeeer.werwerwer`
      let token = bearerAuth.split(" ")[1]; // sdasdas.sdeeer.werwerwer
      let userObject = jwt.verify(token, process.env.SECRET); // {email:"email" , "iat": "any"}
      let { email } = userObject;
      client
        .query(`SELECT * FROM users WHERE email ='${email}'`)
        .then(async (user) => {
          if (user.rows.length) {
            req.user = user.rows[0];
            next();
          }
        });
    } else {
      res.status(401).send("Token is not provided");
    }
  } catch (err) {
    next(`Error inside bearerAuth middleware : ${err}`);
  }
}

module.exports = { bearerAuth };
