const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.plateNum = !isEmpty(data.plateNum) ? data.plateNum : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.plateNum)) {
    errors.plateNum = "plateNum Field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
