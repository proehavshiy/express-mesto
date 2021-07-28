const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then((cards) => { res.send({ cards }); })
    .catch((error) => { res.status(500).send({ error }); });
}

function postCards(req, res) {
  const { _id } = req.user; // захардкоженый id юзера
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => { res.status(201).send({ card }); })
    .catch((error) => { res.status(404).send({ error }); });
}

function deleteCardById(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => { res.send(`Карточка ${deletedCard._id} успешно удалена`); })
    .catch((error) => { res.send({ error }); });
}

function putCardLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user; // захардкоженый id юзера
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: _id }, // добавить _id в массив, если его там нет
    },
    { // объект опций
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((likedCard) => { res.send({ message: `лайк карточке ${cardId} записан` }); })
    .catch((error) => { res.send({ error }); });
}

function deleteCardLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user; // захардкоженый id юзера
  const card = Card.findById(cardId);
  // console.log('card:', card);
  if (card) {
    console.log('карточка найдена');
  }
  if (!card) {
    console.log('карточка не найдена');
    return;
  }
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id }, // убрать _id из массива
    },
    { // объект опций
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((likedCard) => { res.send({ message: `лайк у карточки ${cardId} убран` }); })
    .catch((error) => { res.send({ error }); });
}

module.exports = {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
