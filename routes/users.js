const usersRouter = require('express').Router();

// import controllers
const {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
  login,
} = require('../controllers/users');
// import middlewares
const {
  doesUserExist,
} = require('../middlewares/middlewares');

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', doesUserExist);
usersRouter.get('/:userId', getUser);

usersRouter.post('/', postUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

usersRouter.post('/signin', login);

module.exports = usersRouter;
