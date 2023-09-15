const Joi = require("joi");
const CustomError = require("../libs/customError");

const userValidation = (user) => {
  const User = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().max(32).required(),
    password: Joi.string().required(),
  });
  const { error } = User.validate(user);
  if (error) {
    const errorMessage = error.details[0].message;
    return new CustomError(400, errorMessage);
  }

  return error;
};

module.exports = userValidation;