const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Payment = require("../../models/Payment");

// Validation
const validatePaymentInput = require("../../validation/payment");

// @route   GET api/payment/test
// @desc    Test payment route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Payment success" }));

// @route   GET api/payment
// @desc    GET payment
// @access  Public

router.get("/", (req, res) => {
  Payment.find()
    .sort({ date: -1 })
    .then(payment => res.json(payment))
    .catch(err => res.status(404));
});

// @route   GET api/payment/:id
// @desc    GET payment by id
// @access  Public

router.get("/:user_id", (req, res) => {
  Payment.find({ user: req.params.user_id })
    .then(payment => res.json(payment))
    .catch(err =>
      res.status(404).json({ nopostfound: "no post found with that ID" })
    );
});

// @route   POST api/payment
// @desc    Create payment
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePaymentInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPayment = new Payment({
      cardtype: req.body.cardtype,
      cardnum: req.body.cardnum,
      user: req.user.id,
      expiration: req.body.expiration,
      code: req.body.code,
      status: req.body.status
    });

    newPayment.save().then(payment => res.json(payment));
  }
);

module.exports = router;
