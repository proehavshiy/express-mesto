/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose/lib/drivers/node-mongodb-native');

const linkValidator = function linkValidator(str) {
  const regex = /https?\:\/\/w?w?w?\.?[0-9a-z-A-Z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]{1,}\#?/;
  return regex.test(str);
};

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
      validator: linkValidator, // валидация ссылки через модуль валидатор
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: [{
    type: ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
