// const catcher = require('../tryCatcher/tryCatcher');
const client = require("../client");

module.exports = function (type, payload) {
  switch (type) {
    case "sign-up":
      return (req, res, next) => {
        try {
          console.log(req.body);
          let sql = ``;
          if (req.body.role) {
            sql = `INSERT INTO users (email, password, role)
            VALUES ('${req.body.email}', '${req.body.password}', 'admin');`;
          } else {
            sql = `INSERT INTO users (email, password)
            VALUES ('${req.body.email}', '${req.body.password}');`;
          }
          client.query(sql).then((resolved) => {
            res.status(201).send("Created Succesfully");
          });
        } catch (e) {
          next(e);
        }
      };
    case "login":
      return (req, res, next) => {
        try {
          res.status(200).send(req.signedUser)
        } catch (e) {
          next(e);
        }
      };
    default:
      return null;
  }
};
