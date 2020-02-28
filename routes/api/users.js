const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users success" }));

// @route   GET api/users/register
// @desc    register new users route
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ plateNum: req.body.plateNum }).then(user => {
    if (user) {
      errors.plateNum = "Car Plate Number already exists";
      return res.status(400).json(errors);
    } else {
      const newCar = new User({
        plateNum: req.body.plateNum,
        password: req.body.password,
        isCrew: false
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCar.password, salt, (err, hash) => {
          if (err) throw err;
          newCar.password = hash;
          newCar
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login User/ Return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const plateNum = req.body.plateNum;
  const password = req.body.password;

  // Find User by plateNum
  User.findOne({ plateNum }).then(user => {
    //check for user
    if (!user) {
      errors.plateNum = " Car not Found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        const payload = { id: user.id, name: user.name };

        // Sign Token
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      plateNum: req.user.plateNum,
      isCrew: req.user.isCrew
    });
  }
);

module.exports = router;
