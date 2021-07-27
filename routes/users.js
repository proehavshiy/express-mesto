const usersRouter = require('express').Router();

// import controllers
const {
  doesUserExist,
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', doesUserExist);
usersRouter.get('/:userId', getUser);

usersRouter.post('/', postUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
