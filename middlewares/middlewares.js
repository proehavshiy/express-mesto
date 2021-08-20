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
  'http://front.mesto15.nomoredomains.club',
  'https://front.mesto15.nomoredomains.club',
  'http://localhost:3000/react-mesto-auth',
];

// eslint-disable-next-line consistent-return
function setCors(req, res, next) {
  // Записываем в переменную origin соответствующий заголовок
  const { origin } = req.headers;
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
}

module.exports = {
  setNoCacheHeaders,
  setCors,
};
