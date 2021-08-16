/* eslint-disable no-useless-escape */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../middlewares/Errors/UnauthorizedError');

const emailValidator = function emailValidator(str) {
  return validator.isEmail(str, {
    allow_utf8_local_part: false,
  });
};

// const linkValidator = function linkValidator(str) {
// eslint-disable-next-line max-len
//   const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9-.]{2,}\.[a-z]{2,3}\b([0-9a-z-A-Z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*)\#?/;
//   return regex.test(str);
// };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    required: false,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
    required: false,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      // validator: linkValidator, // валидация ссылки через regexp
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: emailValidator, // валидация емейла через модуль validator
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// проверка емейла и пороля при аутентификации
// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // ищем пользователя по емейлу в базе
  return this.findOne({ email }).select('+password') // чтобы принудительно отдавать сюда пароль
    .then((user) => {
      // если пользователя по емейлу нет
      if (!user) {
        // return Promise.reject(new ErrorConstructor('invalidPasswordOrEmail'));
        return Promise.reject(new UnauthorizedError('Некорректный емейл или пароль'));
      }
      // если пользователь нашелся в базе
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // return Promise.reject(new ErrorConstructor('invalidPasswordOrEmail'));
            return Promise.reject(new UnauthorizedError('Некорректный емейл или пароль'));
          }
          // возвращаем юзера, если все проверки удачны
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
