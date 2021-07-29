const { INCORRECT_CODE, NOTFOUND_CODE, DEFAULT_CODE } = require('./errorStatuses');

const ERROR_TYPES = [
  'CastError', // Mongoose could not convert a value to the type defined in the schema path.
  'TypeError', // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
  'ValidationError', // когда нехвататет поля или ошибка с типом данных в полях
];

const texts = {
  users: {
    getUser: 'Пользователь по указанному id не найден', // 404
    postUser: 'Переданы некорректные данные.', // 400
    updateUser: {
      TypeError: 'Пользователь по указанному id не найден', // 404
      CastError: 'Переданы некорректные данные.', // 400
    },
    updateAvatar: {
      TypeError: 'Пользователь по указанному id не найден', // 404
      CastError: 'Переданы некорректные данные.', // 400
    },
  },
  cards: {
    postCards: 'Переданы некорректные данные.', // 400
    deleteCardById: 'Карточка с указанным id не найдена.', // 404
    putCardLike: 'Переданы некорректные данные.', // 400
    deleteCardLike: 'Переданы некорректные данные.', // 400
  },
  default: 'На сервере произошла ошибка', // 500
};

// eslint-disable-next-line no-unused-vars
function catchErrors(nameOfHandler, res, errorName) {
  // eslint-disable-next-line no-constant-condition
  if (nameOfHandler === ('updateUser' || 'updateAvatar')) {
    if (errorName === 'TypeError') {
      return res.status(NOTFOUND_CODE).send({
        message: 'Пользователь по указанному id не найден',
      });
    }
    if (errorName === 'CastError') {
      return res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    }
  }
  if (nameOfHandler === 'getUser') {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(NOTFOUND_CODE).send({
        message: 'Пользователь по указанному id не найден',
      });
    }
  }
  if (nameOfHandler === ('postUser' || 'postCards' || 'putCardLike' || 'deleteCardLike')) {
    if (ERROR_TYPES.includes(errorName)) {
      return res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные .',
      });
    }
  }
  // дефолтная ошибка
  return res.status(DEFAULT_CODE).send({
    message: 'На сервере произошла ошибка',
  });
}

const catchHandlers = {
  getUsers: (res) => {
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  getUser: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(NOTFOUND_CODE).send({
        message: 'Пользователь по указанному id не найден',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  postUser: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные при создании пользователя.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  updateUser: (res, errorName) => {
    if (errorName === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
      res.status(NOTFOUND_CODE).send({
        message: 'Пользователь по указанному id не найден',
      });
    }
    if (errorName === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  updateAvatar: (res, errorName) => {
    if (errorName === 'TypeError') { // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
      res.status(NOTFOUND_CODE).send({
        message: 'Пользователь по указанному id не найден',
      });
    }
    if (errorName === 'CastError') { // Mongoose could not convert a value to the type defined in the schema path.
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  getCards: (res) => {
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  postCards: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные при создании карточки.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  deleteCardById: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(NOTFOUND_CODE).send({
        message: 'Карточка с указанным id не найдена.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  putCardLike: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные для постановки лайка.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
  deleteCardLike: (res, errorName) => {
    if (ERROR_TYPES.includes(errorName)) {
      res.status(INCORRECT_CODE).send({
        message: 'Переданы некорректные данные для снятия лайка.',
      });
    }
    res.status(DEFAULT_CODE).send({
      message: 'На сервере произошла ошибка',
    });
  },
};

// console.log('catchHandlers:', catchHandlers.getUser);

module.exports = { catchErrors, catchHandlers };

/*
'CastError', =>

*/


