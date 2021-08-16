/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const validator = require('validator');

// const linkValidator = function linkValidator(str) {
// eslint-disable-next-line max-len
//   const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9-.]{2,}\.[a-z]{2,3}\b([0-9a-z-A-Z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*)\#?/;
//   return regex.test(str);
// };

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      // validator: linkValidator, // валидация ссылки через модуль валидатор
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
