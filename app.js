// включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs').promises;

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { setCors } = require('./middlewares/middlewares');

const app = express();

// подключаемся к серверу mongo
// mongoose.connect();

// отдача статики
app.use(express.static(path.resolve(__dirname, 'public')));
// мидлвара управления CORS
app.use(setCors);
// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());
// роут users
app.use('/users', usersRouter);
// роут cards
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`server has loaded on ${PORT}`);
});
