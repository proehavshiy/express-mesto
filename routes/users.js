const usersRouter = require('express').Router();

// import controllers
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserContent,
} = require('../controllers/users');

const {
  validateRequestOfUpdateUser,
  validateRequestOfUpdateAvatar,
  validateRequestOfControllerWithUserId,
} = require('../middlewares/requestValidation/validationOfUserRequests'); // валидация входящих запросов по api

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserContent);
usersRouter.patch('/me', validateRequestOfUpdateUser(), updateUser);
usersRouter.patch('/me/avatar', validateRequestOfUpdateAvatar(), updateAvatar);

usersRouter.get('/:userId', validateRequestOfControllerWithUserId(), getUser);

module.exports = usersRouter;
