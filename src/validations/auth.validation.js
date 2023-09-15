const Joi = require("joi");

const authValidation = (user) => {
  const User = Joi.object({
    username: Joi.string().max(32).required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
  });
  const { error } = User.validate(user);
  return error;
};

module.exports = authValidation;
