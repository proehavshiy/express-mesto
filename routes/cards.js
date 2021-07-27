const cardsRouter = require('express').Router();

// import controllers
const {
  getCards,
  postCards,
  deleteCardById,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', postCards);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', putCardLike);
cardsRouter.delete('/:cardId/likes', deleteCardLike);

module.exports = cardsRouter;
