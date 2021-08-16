const NotFoundError = require('../middlewares/Errors/NotFoundError');

function errorPage(req, res, next) {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
}

module.exports = errorPage;
