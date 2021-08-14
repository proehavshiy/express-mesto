const jwt = require('jsonwebtoken');
const ErrorConstructor = require('./ErrorConstructor');

// eslint-disable-next-line consistent-return
// auth token from cookie
function authByToken(req, res, next) {
  const { token } = req.cookies; // извлекаем заголовок с токеном из кук
  // если нет токена
  if (!token) {
    next(new ErrorConstructor('needAuth'));
  }
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

// auth token from req.body
// function authByToken(req, res, next) {
//   const { authorization } = req.headers; // извлекаем заголовок с токеном из хедера
//   // если заголовка нет / он не начинается с Bearer, вернем ошибку
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     next(new ErrorConstructor('needAuth'));
//   }
//   const token = authorization.replace('Bearer ', ''); // извлекаем токен
//   // верифицируем токен от пользователя (раскодируем)
//   // Чтобы обработать ошибку, нужно обернуть в try catch
//   let payload;
//   try {
//     payload = jwt.verify(token, 'some-secret-key');
//   } catch (err) {
//     next(new ErrorConstructor('needAuth'));
//   }
//   // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
//   req.user = payload; // записываем пейлоуд в объект запроса, чтобы подхватить его в следующем мидлваре
//   next();
// }
