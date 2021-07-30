// включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/error');
const { setCors } = require('./middlewares/middlewares');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mmongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// мидлвара управления CORS
app.use(setCors);
// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());

// временная мидлвара - хардкод юзера
app.use('/', (req, res, next) => {
  req.user = {
    _id: '61013e4c33a8653daab022f7', // '61013e4c33a8653daab022f7'
  };
  next();
});
// роут users
app.use('/users', usersRouter);

// роут cards
app.use('/cards', cardsRouter);

// роут 404
app.use('*', errorRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`the server has started on the port ${PORT}`);
});
