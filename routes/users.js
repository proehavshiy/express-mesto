const usersRouter = require('express').Router();

// import controllers
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserContent,
} = require('../controllers/users');
// import middlewares
const {
  doesUserExist,
} = require('../middlewares/middlewares');

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', doesUserExist);

usersRouter.get('/me', getUserContent);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

usersRouter.get('/:userId', getUser);

module.exports = usersRouter;
