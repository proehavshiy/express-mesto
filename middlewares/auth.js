const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function authByToken(req, res, next) {
  console.log('header:', req.headers);
  const { authorization } = req.headers; // извлекаем заголовок с токеном из хедера
  // если заголовка нет / он не начинается с Bearer, вернем ошибку
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Необходима авторизация',
    });
  }
  const token = authorization.replace('Bearer ', ''); // извлекаем токен
  // верифицируем токен от пользователя (раскодируем)
  // Чтобы обработать ошибку, нужно обернуть в try catch
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(403).end({
      message: 'Необходима авторизация',
    });
  }
  // eslint-disable-next-line max-len
  req.user = payload; // записываем пейлоуд в объект запроса, чтобы подхватить его в следующем мидлваре
  next();
}

module.exports = authByToken;
