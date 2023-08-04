const client = require("../client");
const axios = require("axios");
const { W_API, API_KEY } = require("../config");

module.exports = function (type, payload) {
  switch (type) {
    case "all-data":
      return async (req, res, next) => {
        try {
          let data = await axios.get(
            `${W_API}/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${API_KEY}`
          );
          res.status(200).send(data.data);
        } catch (e) {
          next(`All-Data weather controller` + e);
        }
      };
    case "save-to-fav":
      return async (req, res, next) => {
        try {
          const user = req.user;
          const { weather, visibility, owner, comment } = req.body;
          const values = [weather, visibility, user.email, comment];
          client
            .query(
              `INSERT INTO fav (weather, visibility, owner, comment) VALUES ($1, $2, $3, $4)`,
              values
            )
            .then(
              (resolve) => {
                res.status(201).send("Created");
              },
              (reject) => {
                res.status(400).send("Try to add it later");
              }
            );
        } catch (e) {
          next(`save-to-fav weather controller` + e);
        }
      };
    case "get-all-favs":
      return async (req, res, next) => {
        try {
          let sql = ``;
          if (req.user.role == "user") {
            sql = `SELECT * FROM fav WHERE owner='${req.user.email}'`;
          } else {
            sql = `SELECT * FROM fav `;
          }
          client.query(sql).then(
            (resolve) => {
              res.status(200).send(resolve.rows);
            },
            (reject) => {
              res.status(400).send(reject);
            }
          );
        } catch (e) {
          next(`get-all-favs weather controller` + e);
        }
      };
    case "delete-a-fav":
      return async (req, res, next) => {
        try {
          let sql = `DELETE FROM fav WHERE id = ${req.params.id} AND owner = '${req.user.email}'`;
          client.query(sql).then(
            (resolve) => {
              res.status(204).send();
            },
            (reject) => {
              res.status(400).send(reject);
            }
          );
        } catch (e) {
          next(`delete-a-fav weather controller` + e);
        }
      };
    case "delete-a-fav-admin":
      return async (req, res, next) => {
        try {
          let sql = `DELETE FROM fav WHERE id = ${req.params.id}`;
          client.query(sql).then(
            (resolve) => {
              res.status(204).send();
            },
            (reject) => {
              res.status(400).send(reject);
            }
          );
        } catch (e) {
          next(`delete-a-fav-admin weather controller` + e);
        }
      };
    case "update-a-fav":
      return async (req, res, next) => {
        try {
          let sql = `UPDATE fav SET comment=$1 WHERE id = ${req.params.id} AND owner = '${req.user.email}'`;
          client.query(sql, [req.body.comment]).then(
            (resolve) => {
              res.status(200).send("Updated");
            },
            (reject) => {
              res.status(400).send(reject);
            }
          );
        } catch (e) {
          next(`update-a-fav weather controller` + e);
        }
      };

    default:
      return null;
  }
};
