/* eslint-disable no-param-reassign */
const Card = require('../models/card');
const NotFoundError = require('../middlewares/Errors/NotFoundError');
const IncorrectDataError = require('../middlewares/Errors/IncorrectDataError');
const ForbiddenError = require('../middlewares/Errors/ForbiddenError');

function getCards(req, res, next) {
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
    .catch((error) => next(error));
}

function postCards(req, res, next) {
  const { _id } = req.user;
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
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function deleteCardById(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;
  // ищем карточку и сравниваем id пользователя с id владельца
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка или пользователь не найдены')) // отлавливаем ошибку с null значением
    .then((card) => {
      if (userId !== card.owner.toString()) {
        // throw new ErrorConstructor('notMyCard'); // ошибка удаления чужой карточки
        throw new ForbiddenError('Удаление чужой карточки невозможно'); // ошибка удаления чужой карточки
      } else {
        // если пользователь и владелец совпадают, удаляем карточку
        Card.findByIdAndRemove(cardId)
          .orFail(new NotFoundError('Карточка или пользователь не найдены')) // отлавливаем ошибку с null значением
          .then((deletedCard) => {
            res.send({
              message: `Карточка ${deletedCard._id} успешно удалена`,
            });
          });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function putCardLike(req, res, next) {
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
    .orFail(new NotFoundError('Карточка или пользователь не найдены')) // отлавливаем ошибку с null значением
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
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

function deleteCardLike(req, res, next) {
  const { cardId } = req.params;
  const { _id } = req.user;
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
    .orFail(new NotFoundError('Карточка или пользователь не найдены')) // отлавливаем ошибку с null значением
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
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') { // ошибки валидации схемы
        next(new IncorrectDataError('Переданы некорректные данные.'));
      }
      next(error);
    });
}

module.exports = {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
};
