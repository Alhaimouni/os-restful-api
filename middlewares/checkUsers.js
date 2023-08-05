"use strict";

const bcrypt = require("bcrypt");
const client = require("../client");

async function checkUser(req, res, next) {
  try {
    const { email, password } = req.body; //{"email":"any","password":"any","role":"admin/user"}  must be as userModel properties names
    let checkemail = client
      .query(`SELECT * FROM users WHERE email ='${email}'`)
      .then((users) => {
        if (!users.rows.length) {
          bcrypt.hash(password, 10).then((pass) => {
            req.body.password = pass;
            next();
          });
        } else {
          res.status(400).send("Email is exist");
        }
      })
      .catch((rej) => {
        next(`Error with signing up`);
      });
  } catch (err) {
    next(`Error inside checkUser middleware : ${err}`);
  }
}

module.exports = { checkUser };
