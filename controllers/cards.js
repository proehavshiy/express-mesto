const Card = require('../models/card');
const { catchHandlers } = require('../utils/errorResponses');

function getCards(req, res) {
  Card.find({})
    .then((cards) => {
      res.send(cards.map(((card) => {
        const {
          likes, name, link, _id, owner,
        } = card;
        const obj = {};
        obj.likes = likes;
        obj.name = name;
        obj.link = link;
        obj._id = _id;
        obj.owner = owner;
        return obj;
      })));
    })
    .catch(() => catchHandlers.getCards(res));
}

function postCards(req, res) {
  const { _id } = req.user; // захардкоженый id юзера
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      const {
        // eslint-disable-next-line no-shadow
        likes, name, link, _id, owner,
      } = card;
      res.status(201).send({
        likes,
        name,
        link,
        _id,
        owner,
      });
    })
    .catch((error) => catchHandlers.postCards(res, error.name));
}

function deleteCardById(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      res.send({
        message: `Карточка ${deletedCard._id} успешно удалена`,
      });
    })
    .catch((error) => catchHandlers.deleteCardById(res, error.name));
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
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((likedCard) => {
      const {
        // eslint-disable-next-line no-shadow
        likes, name, link, _id, owner,
      } = likedCard;
      res.send({
        likes,
        name,
        link,
        _id,
        owner,
      });
      // проверка на повторный лайк
      // if (card.likes.includes(_id)) {
      //   res.status(NOTFOUND_CODE).send({
      //     message: 'Повторная постановка лайка карточке невозможна.',
      //     status: card.likes.includes(_id),
      //   });
      // } else {
      //   res.send({
      //     message: `лайк карточке ${cardId} записан.`,
      //     status: card.likes.includes(_id),
      //   });
      // }
    })
    .catch((error) => catchHandlers.putCardLike(res, error.name));
}

function deleteCardLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user; // захардкоженый id
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id }, // убрать _id из массива
    },
    { // объект опций
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он будет создан
    },
  )
    .then((unlikedCard) => {
      const {
        // eslint-disable-next-line no-shadow
        likes, name, link, _id, owner,
      } = unlikedCard;
      res.send({
        likes,
        name,
        link,
        _id,
        owner,
      });
      // // проверка на повторный лайк
      // if (!unlikedCard.likes.includes(_id)) {
      //   res.status(NOTFOUND_CODE).send({
      //     message: 'Повторное снятие лайка у карточки невозможна.',
      //   });
      // } else {
      //   res.send({
      //     message: `лайк у карточки ${cardId} убран`,
      //   });
      // }
    })
    .catch((error) => catchHandlers.deleteCardLike(res, error.name));
}

module.exports = {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
