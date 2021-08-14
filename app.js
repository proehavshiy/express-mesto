/* eslint-disable import/order */
// включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { setCors } = require('./middlewares/middlewares');
const rateLimit = require('express-rate-limit');
// const validateRequestToken = require('./middlewares/requestValidation/validationOfToken');
const { validateRequestOfregisterAndLogin } = require('./middlewares/requestValidation/validationOfUserRequests');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/error');
const sendError = require('./middlewares/sendError');

// import controllers
const {
  postUser,
  login,
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

// роуты, не требующие авторизации
app.post('/signin', validateRequestOfregisterAndLogin(), login);
app.post('/signup', validateRequestOfregisterAndLogin(), postUser);

// проверка заголовка запроса на наличие токена и защита роутов мидлварой авторизации по токену
// app.use(validateRequestToken, auth);
app.use(auth);

// роут users
app.use('/users', usersRouter);

// роут cards
app.use('/cards', cardsRouter);

// роут 404
app.use('*', errorRouter);

// централизованный обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => sendError(error, res));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`the server has started on the port ${PORT}`);
});
