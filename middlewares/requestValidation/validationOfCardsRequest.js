const { celebrate, Joi } = require('celebrate'); // валидация входящих запросов по api

function validateRequestOfPostUser() {
  return celebrate({
    body: Joi.object().keys({
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().alphanum().required().min(2).max(30),
      link: Joi.string().required().min(5),
    }),
  });
}

function validateRequestOfControllerWithCardId() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  });
}

module.exports = {
  validateRequestOfPostUser,
  validateRequestOfControllerWithCardId,
};
