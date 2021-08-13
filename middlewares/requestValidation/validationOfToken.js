const { celebrate, Joi } = require('celebrate'); // валидация входящих запросов по api

function validateRequestToken(req, res, next) {
  celebrate({
    headers: Joi.object().keys({
      Authorization: Joi.string().alphanum().required().min(20),
    }),
  });
  next();
}

module.exports = validateRequestToken;
