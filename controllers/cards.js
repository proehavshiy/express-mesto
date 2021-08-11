const Card = require('../models/card');
const catchErrors = require('../utils/errorResponses');

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
    .catch((error) => catchErrors('getCards', res, error));
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
    .catch((error) => catchErrors('postCards', res, error));
}

function deleteCardById(req, res) {
  const { cardId } = req.params;
  const userId = req.user._id;
  // ищем карточку и сравниваем id пользователя с id владельца
  Card.findById(cardId)
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением, если такой карточки нет
    .then((card) => {
      if (userId !== card.owner.toString()) { // не знаю, как ее перенаправить эту ошибку в catch
        res.status(403).send({ message: 'Удаление чужой карточки невозможно' });
      } else {
        // если пользователь и владелец совпадают, удаляем карточку
        Card.findByIdAndRemove(cardId)
          .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
          .then((deletedCard) => {
            res.send({
              message: `Карточка ${deletedCard._id} успешно удалена`,
            });
          });
      }
    })
    .catch((error) => { catchErrors('deleteCardById', res, error); });
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
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
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
    })
    .catch((error) => catchErrors('putCardLike', res, error));
}

function deleteCardLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user; // захардкоженый id
  // const _id = '111'
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
    .orFail(new Error('notValidId')) // отлавливаем ошибку с null значением
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
    })
    .catch((error) => catchErrors('deleteCardLike', res, error));
}

module.exports = {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
