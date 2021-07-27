function getCards(req, res, next) {
  res.status(200).send('возвращает все карточки');
}

function postCards(req, res, next) {
  // В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.
  res.status(200).send('создаёт карточку');
}

function deleteCardById(req, res, next) {
  res.status(200).send('удаляет карточку по идентификатору');
}

function putCardLike(req, res, next) {
  res.status(200).send('поставить лайк карточке');
}

function deleteCardLike(req, res, next) {
  res.status(200).send('убрать лайк с карточки');
}

module.exports = {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
