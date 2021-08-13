const cardsRouter = require('express').Router();

const {
  validateRequestOfPostUser,
  validateRequestOfControllerWithCardId,
} = require('../middlewares/requestValidation/validationOfCardsRequest'); // валидация входящих запросов по api

// import controllers
const {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateRequestOfPostUser(), postCards);
cardsRouter.delete('/:cardId', validateRequestOfControllerWithCardId(), deleteCardById);
cardsRouter.put('/:cardId/likes', validateRequestOfControllerWithCardId(), putCardLike);
cardsRouter.delete('/:cardId/likes', validateRequestOfControllerWithCardId(), deleteCardLike);

module.exports = cardsRouter;
