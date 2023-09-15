const Joi = require("joi");

const filmValidation = (film) => {
  const Film = Joi.object({
    name: Joi.string().max(32).required(),
    description: Joi.string().required(),
    year: Joi.number().required(),
    price: Joi.string().required(),
    file: Joi.string().required(),
    video_url: Joi.string().uri().required(),
    release: Joi.date().required(),
  });
  const { error } = Film.validate(film);
  return error;
};

module.exports = filmValidation;
