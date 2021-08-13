/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate'); // валидация входящих запросов по api

function validateRequestOfregisterAndLogin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
}

function validateRequestOfUpdateUser() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().alphanum().required().min(2).max(30),
      about: Joi.string().alphanum().required().min(2).max(30),
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
      userId: Joi.string().alphanum().length(24),
    }),
  });
}

module.exports = {
  validateRequestOfregisterAndLogin,
  validateRequestOfUpdateUser,
  validateRequestOfUpdateAvatar,
  validateRequestOfControllerWithUserId,
};
