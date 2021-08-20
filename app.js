/* eslint-disable import/order */
// включает основную логику сервера, запуск и подключение к базе данных;
require('dotenv').config(); // подключаем модуль dotenv, чтобы файл env был доступен в проекте в process.env
// eslint-disable-next-line import/no-unresolved
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { setCors } = require('./middlewares/middlewares');
const rateLimit = require('express-rate-limit');
// const validateRequestToken = require('./middlewares/requestValidation/validationOfToken');
const { validateRequestOfregisterAndLogin } = require('./middlewares/requestValidation/validationOfUserRequests');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
// eslint-disable-next-line import/no-unresolved
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { isCelebrateError } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/error');
const IncorrectDataError = require('./middlewares/Errors/IncorrectDataError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// import controllers
const {
  postUser,
  login,
  logOut,
} = require('./controllers/users');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mmongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// защита от автоматических запросов через лимиты
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем rate-limiter
app.use(limiter);

// мидлвара helmet для защиты передачи данных
app.use(helmet());
app.disable('x-powered-by');

// мидлвара управления CORS
app.use(setCors);
// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());
// подключаем парсер кук как мидлвэр
app.use(cookieParser());

// логгер запросов
app.use(requestLogger);

// роуты, не требующие авторизации
app.post('/signin', validateRequestOfregisterAndLogin(), login);
app.post('/signup', validateRequestOfregisterAndLogin(), postUser);
app.delete('/logout', logOut);

// проверка заголовка запроса на наличие токена и защита роутов мидлварой авторизации по токену
app.use(auth);

// роут users
app.use('/users', usersRouter);

// роут cards
app.use('/cards', cardsRouter);

// роут 404
app.use('*', errorRouter);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use((error, req, res, next) => {
  if (isCelebrateError(error)) {
    next(new IncorrectDataError('Переданы некорректные данные.'));
  }
  next(error);
});

// централизованный обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`the server has started on the port ${PORT}`);
});
