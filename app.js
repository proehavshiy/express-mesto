// включает основную логику сервера, запуск и подключение к базе данных;

const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// мидлвара для собирания тела request JSON-формата
app.use(bodyParser.json());
// роут users
app.use('/users', usersRouter);
// роут cards
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`server has loaded on ${PORT}`);
});
