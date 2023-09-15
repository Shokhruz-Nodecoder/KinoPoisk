const Joi = require("joi");

const loginValidation = (user) => {
  const User = Joi.object({
    username: Joi.string().max(32).required(),
    password: Joi.string().required(),
  });
  const { error } = User.validate(user);
  return error;
};

module.exports = loginValidation;
