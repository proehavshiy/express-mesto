const User = require('../models/user');

function getUsers(req, res) {
  User.find({})
    .then((users) => { res.send({ users }); })
    .catch((error) => { res.status(404).send({ error: `Произошла ошибка получения массива пользователей:${error}` }); });
}

function getUser(req, res) {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => { res.send({ user }); })
    .catch((error) => { res.status(404).send({ error }); });
}

function postUser(req, res) {
  const { name, about, avatar } = req.body;
  // создаем в DB нового юзера через использование метода модели - create.
  // В колбэках обрабатываем ок или ошибку
  User.create({ name, about, avatar })
    .then((user) => { res.staus(201).send({ user }); })
    .catch((error) => { res.status(404).send({ error: `Произошла ошибка создания пользователя:${error}` }); });
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
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((updatedUser) => { res.send({ updatedUser }); })
    .catch((error) => { res.send({ error }); });
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
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((updatedAvatar) => { res.send({ updatedAvatar }); })
    .catch((error) => { res.send({ error }); });
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
};
