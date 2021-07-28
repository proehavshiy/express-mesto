const User = require('../models/user');
const ERROR_TYPES = require('../utils/errorTypes');

function getUsers(req, res) {
  User.find({})
    .then((users) => { res.send({ users }); })
    .catch(() => {
      res.status(500).send({
        message: 'Ошибка получения массива пользователей',
      });
    });
}

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (toString(userId) === toString(user._id)) {
        res.send({ user });
      }
    })
    .catch((error) => {
      if (ERROR_TYPES.includes(error.name)) {
        res.status(404).send({
          message: `Пользователь по указанному _id: ${userId} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      res.status(500).send({
        message: 'Ошибка получения данных',
        name: error.name,
        details: error.message,
      });
    });
}

function postUser(req, res) {
  const { name, about, avatar } = req.body;
  // создаем в DB нового юзера через использование метода модели - create.
  // В колбэках обрабатываем ок или ошибку
  User.create({ name, about, avatar })
    .then((user) => { res.staus(201).send({ user }); })
    .catch((error) => {
      if (ERROR_TYPES.includes(error.name)) {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(500).send({
        message: 'Ошибка получения данных',
        name: error.name,
        details: error.message,
      });
    });
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
    .then((updatedUser) => {
      if (toString(_id) === toString(updatedUser._id)) {
        res.send({ updatedUser });
      }
    })
    .catch((error) => {
      if (error.name === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
        res.status(404).send({
          message: `Пользователь по указанному _id: ${_id} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      if (error.name === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(500).send({
        message: 'Ошибка получения данных',
        name: error.name,
        details: error.message,
      });
    });
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
    .then((updatedAvatar) => {
      if (toString(_id) === toString(updatedAvatar._id)) {
        res.send({ updatedAvatar });
      }
    })
    .catch((error) => {
      if (error.name === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
        res.status(404).send({
          message: `Пользователь по указанному _id: ${_id} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      if (error.name === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(500).send({
        message: 'Ошибка получения данных',
        name: error.name,
        details: error.message,
      });
    });
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
};
