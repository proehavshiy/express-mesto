const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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
  },
  email: { // добавить обработку через Validator позже
    type: String,
    required: true,
    unique: true,
  },
  password: { // добавить обработку через Validator позже
    type: String,
    required: true,
    minlength: 8,
  },
});

// проверка емейла и пороля при аутентификации
// добавим метод findUserByCredentials схеме пользователя
// у него будет два параметра — почта и пароль
userSchema.statics.findUserByCredentials = function (email, password) {
  // ищем пользователя по емейлу в базе
  return this.findOne({ email })
    .then((user) => {
      // если пользователя по емейлу нет
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // если пользователь нашелся в базе
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // возвращаем юзера, если все проверки удачны
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
