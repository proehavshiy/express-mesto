/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate'); // валидация входящих запросов по api

function validateRequestOfPostUser() {
  return celebrate({
    body: Joi.object().keys({
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9-.]{2,}\.[a-z]{2,3}\b([0-9a-z-A-Z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*)\#?/),
    }),
  });
}

function validateRequestOfControllerWithCardId() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  });
}

module.exports = {
  validateRequestOfPostUser,
  validateRequestOfControllerWithCardId,
};
