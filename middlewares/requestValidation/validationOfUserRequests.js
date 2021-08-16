/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate'); // валидация входящих запросов по api

function validateRequestOfregisterAndLogin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9-.]{2,}\.[a-z]{2,3}\b([0-9a-z-A-Z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*)\#?/),
    }),
  });
}

function validateRequestOfUpdateUser() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });
}

function validateRequestOfUpdateAvatar() {
  return celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().min(5),
    }),
  });
}

function validateRequestOfControllerWithUserId() {
  return celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  });
}

module.exports = {
  validateRequestOfregisterAndLogin,
  validateRequestOfUpdateUser,
  validateRequestOfUpdateAvatar,
  validateRequestOfControllerWithUserId,
};
