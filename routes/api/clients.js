const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateRegisterClient = require("../../validation/registerClient");
const validateLoginInput = require("../../validation/login");

//Load Client model
const Client = require("../../models/Client");

// @route Get api/clients/test
// @desc Test client route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Client success" }));

// @route Post api/clients/register
// @desc Add mew Client account
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterClient(req.body);

  //   CHeck Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Client.findOne({ plateNum: req.body.plateNum }).then(client => {
    if (client) {
      errors.plateNum = "Car already Registered";
      return res.status(400).json(errors);
    } else {
      const newClient = new Client({
        plateNum: req.body.plateNUm,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCLient.password, salt, (err, hash) => {
          if (err) throw err;
          newClient.password = hash;
          newClient
            .save()
            .then(client => res.json(client))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
