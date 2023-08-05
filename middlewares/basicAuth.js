"use strict";
const client = require("../client");
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function basicAuth(req, res, next) {
  try {
    let basicAuth = req.headers.authorization; // `Basic 34$%#$%$#$%@@RR@#$C$`
    let encodedData = basicAuth.split(" ")[1]; // `34$%#$%$#$%@@RR@#$C$`
    let decodedData = base64.decode(encodedData); // username:password
    let [email, password] = decodedData.split(":");
    client
      .query(`SELECT * FROM users WHERE email ='${email}'`)
      .then(async (user) => {
        if (user.rows.length) {
          let ps = await bcrypt.compare(password, user.rows[0].password);
          if (ps) {
            const token = jwt.sign(
              { email: user.rows[0].email },
              process.env.SECRET
            );
            req.signedUser = {
              ...user.rows[0],
              token,
            };
            next();
          } else {
            res.status(400).send("Email or Password are not correct");
          }
        } else {
          res.status(400).send("Email not found");
        }
      })
      .catch((rej) => {
        next(`Error with login ${rej}`);
      });
  } catch (err) {
    next(`Error inside basicAuth middleware : ${err}`);
  }
}

module.exports = { basicAuth };
