// включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { setCors } = require('./middlewares/middlewares');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mmongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// отдача статики
app.use(express.static(path.resolve(__dirname, 'public')));
// мидлвара управления CORS
app.use(setCors);
// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());

// временная мидлвара - хардкод юзера
app.use('/', (req, res, next) => {
  req.user = {
    _id: '61013e4c33a8653daab022f6', // '61013e4c33a8653daab022f7'
  };
  next();
});
// роут users
app.use('/users', usersRouter);

// роут cards
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`server has loaded on ${PORT}`);
});
