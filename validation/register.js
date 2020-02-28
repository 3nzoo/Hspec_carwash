const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.plateNum = !isEmpty(data.plateNum) ? data.plateNum : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.plateNum, { min: 6, max: 9 })) {
    errors.plateNum =
      "Plate Numer or Induction Number must be Between 6 and 9 characters";
  }

  if (Validator.isEmpty(data.plateNum)) {
    errors.plateNum = " This Field is Required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
