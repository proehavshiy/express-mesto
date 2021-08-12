const jwt = require('jsonwebtoken');
const ErrorConstructor = require('./ErrorConstructor');

// eslint-disable-next-line consistent-return
function authByToken(req, res, next) {
  const { authorization } = req.headers; // извлекаем заголовок с токеном из хедера
  // если заголовка нет / он не начинается с Bearer, вернем ошибку
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorConstructor('needAuth'));
  }
  const token = authorization.replace('Bearer ', ''); // извлекаем токен
  // верифицируем токен от пользователя (раскодируем)
  // Чтобы обработать ошибку, нужно обернуть в try catch
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new ErrorConstructor('needAuth'));
  }
  // eslint-disable-next-line max-len
  req.user = payload; // записываем пейлоуд в объект запроса, чтобы подхватить его в следующем мидлваре
  next();
}

module.exports = authByToken;
