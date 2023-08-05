"use strict";

function acl(capability) {
  return function aclMiddleware(req, res, next) {
    try {
      let auth = req.user.role == capability;
      if (auth) {
        next();
      } else {
        res.status(403).send("Not Authorized");
      }
    } catch (err) {
      next(`Error inside acl middleware :${err}`);
    }
  };
}

module.exports = { acl };
