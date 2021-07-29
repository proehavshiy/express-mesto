const User = require('../models/user');
const ERROR_TYPES = require('../utils/errorTypes');
const { INCORRECT_CODE, NOTFOUND_CODE, DEFAULT_CODE } = require('../utils/errorStatuses');

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      // res.send({ users });
      res.send(users.map(((user) => {
        const {
          name, about, avatar, _id,
        } = user;
        const obj = {};
        obj.name = name;
        obj.about = about;
        obj.avatar = avatar;
        obj._id = _id;
        return obj;
      })));
    })
    .catch(() => {
      res.status(DEFAULT_CODE).send({
        message: 'Ошибка получения массива пользователей',
      });
    });
}

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
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
    .catch((error) => {
      if (ERROR_TYPES.includes(error.name)) {
        res.status(NOTFOUND_CODE).send({
          message: `Пользователь по указанному _id: ${userId} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      res.status(DEFAULT_CODE).send({
        message: 'На сервере произошла ошибка',
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
    .then((user) => {
      const {
        // eslint-disable-next-line no-shadow
        name, about, avatar, _id,
      } = user;
      res.status(201).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((error) => {
      if (ERROR_TYPES.includes(error.name)) {
        res.status(INCORRECT_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(DEFAULT_CODE).send({
        message: 'На сервере произошла ошибка',
        name: error.name,
        details: error.message,
      });
    });
}

function updateUser(req, res) {
  // const { _id } = req.user; // захардкоженый id юзера
  const _id = '61029e5093e81058a34a9a1e'; // '61029e5093e81058a34a9a1e';
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
      // если не сделать проверку по id,
      // то ошибка TypeError "Cannot read property '_id' of null" не падает в catch
      if (toString(_id) === toString(updatedUser._id)) {
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
      }
    })
    .catch((error) => {
      if (error.name === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
        res.status(NOTFOUND_CODE).send({
          message: `Пользователь по указанному _id: ${_id} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      if (error.name === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
        res.status(INCORRECT_CODE).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(DEFAULT_CODE).send({
        message: 'На сервере произошла ошибка',
        name: error.name,
        details: error.message,
      });
    });
}

function updateAvatar(req, res) {
  // const { _id } = req.user; // захардкоженый id юзера
  const _id = '61029e5093e81058a34a9a1e'; // '61029e5093e81058a34a9a1e';
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
      // если не сделать проверку по id,
      // то ошибка TypeError "Cannot read property '_id' of null" не падает в catch
      if (toString(_id) === toString(updatedAvatar._id)) {
        const {
          // eslint-disable-next-line no-shadow
          avatar, _id,
        } = updatedAvatar;
        res.send({
          avatar,
          _id,
        });
      }
    })
    .catch((error) => {
      if (error.name === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
        res.status(NOTFOUND_CODE).send({
          message: `Пользователь по указанному _id: ${_id} не найден`,
          name: error.name,
          details: error.message,
        });
      }
      if (error.name === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
        res.status(INCORRECT_CODE).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
          name: error.name,
          details: error.message,
        });
      }
      res.status(DEFAULT_CODE).send({
        message: 'На сервере произошла ошибка',
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
