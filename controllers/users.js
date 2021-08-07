const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchErrors = require('../utils/errorResponses');

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      res.send(users.map(((user) => {
        const {
          name, about, avatar, _id, email, password,
        } = user;
        const obj = {};
        obj.name = name;
        obj.about = about;
        obj.avatar = avatar;
        obj._id = _id;
        obj.email = email; // потом убрать
        obj.password = password; // потом убрать
        return obj;
      })));
    })
    .catch((error) => catchErrors('getUsers', res, error));
}

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      res.send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((error) => catchErrors('getUser', res, error));
}

function postUser(req, res) {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;
  // защищаем пароль хешированием через библиотеку bcrypt
  bcrypt.hash(password, 10)
    // eslint-disable-next-line max-len
    .then((hashedPassword) => User.create({ // создаем в DB нового юзера через использование метода модели - create.
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    }))
    .then((user) => {
      const {
        // eslint-disable-next-line no-shadow
        name, about, avatar, _id,
      } = user;
      res.status(201).send({
        name,
        about,
        avatar,
        email, // убрать после
        // password: hashedPassword, // убрать после
        _id,
      });
    })
    .catch((error) => catchErrors('postUser', res, error));
}

function updateUser(req, res) {
  const { _id } = req.user; // захардкоженый id юзера
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    {
      name,
      about,
    },
    { // объект опций
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
    .then((updatedUser) => {
      const {
        // eslint-disable-next-line no-shadow
        name, about, avatar, _id,
      } = updatedUser;
      res.send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((error) => catchErrors('updateUser', res, error));
}

function updateAvatar(req, res) {
  const { _id } = req.user; // захардкоженый id юзера
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    {
      avatar,
    },
    { // объект опций
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
    .then((updatedAvatar) => {
      const {
        // eslint-disable-next-line no-shadow
        avatar, _id,
      } = updatedAvatar;
      res.send({
        avatar,
        _id,
      });
    })
    .catch((error) => catchErrors('updateAvatar', res, error));
}

// аутентификация (логин)
function login(req, res) {
  const { email, password } = req.body;
  // ищем пользователя по емейлу в базе
  User.findUserByCredentials(email, password)
    .then((user) => {
      // создаем и отправляем пользователю токен
      const token = jwt.sign(
        { _id: user._id }, // то, что шифруем
        'some-secret-key', // подпись секретного ключа для шифрования
        { expiresIn: '7d' }, // опции : токен будет просрочен через 7 дней
      );
      // console.log('token', token)
      res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
}

function getUserContent(req, res) {
  // console.log('req.user', req.user);

  User.findById(req.user)
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
    .then((user) => {
      const {
        _id, email,
      } = user;
      res.send({
        _id,
        email,
      });
    })
    // .catch((error) => catchErrors('getContent', res, error));
    .catch((err) => res.send(err));
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
  login,
  getUserContent,
};
