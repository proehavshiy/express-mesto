// существует ли юзер
function doesUserExist(req, res, next) {
  const { userId } = req.params;
  if (userId === 'err') { // потом написать более нормальную проверку по базе на основе регулярных выражений
    res.status(404).send({ message: 'Пользователь по указанному id не найден' });
  }
  next();
}

// отключение кеширования
function setNoCacheHeaders(req, res, next) {
  res.header('Cache-Control', 'no-store');
  next();
}

// управление CORS
// использую ручную настройку
// можно использовать библиотеку https://www.npmjs.com/package/cors

// Массив разешённых доменов
const allowedCors = [
  'localhost:3000',
  'https://www.google.ru',
];

function setCors(req, res, next) {
  // Записываем в переменную origin соответствующий заголовок
  const { origin } = req.headers;
  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
}

module.exports = {
  doesUserExist,
  setNoCacheHeaders,
  setCors,
};
