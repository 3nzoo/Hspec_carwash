const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePaymentInput(data) {
  let errors = {};

  data.cardtype = !isEmpty(data.cardtype) ? data.cardtype : "";
  data.cardnum = !isEmpty(data.cardnum) ? data.cardnum : "";
  data.expiration = !isEmpty(data.expiration) ? data.expiration : "";
  data.code = !isEmpty(data.code) ? data.code : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.cardtype)) {
    errors.cardtype = "Card type is required";
  }

  if (Validator.isEmpty(data.cardnum)) {
    errors.cardnum = "Card Number is required";
  }

  if (Validator.isEmpty(data.expiration)) {
    errors.expiration = "Card expiration is required";
  }

  if (Validator.isEmpty(data.code)) {
    errors.code = "Card cvv Code is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
