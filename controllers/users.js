const User = require('../models/user');
const { catchHandlers } = require('../utils/errorResponses');

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
    .catch(() => catchHandlers.getUsers(res));
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
    .catch((error) => catchHandlers.getUser(res, error.name));
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
    .catch((error) => catchHandlers.postUser(res, error.name));
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
    .catch((error) => catchHandlers.updateUser(res, error.name));
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
    .catch((error) => catchHandlers.updateAvatar(res, error.name));
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
};
