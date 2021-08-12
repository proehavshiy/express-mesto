function sendError(error, res) {
  if (error.name === 'CastError') {
    if (error.path && error.path !== '_id') { // при нарушении типа данных в полях запроса (в обновлении юзера и аватара - напр - "about": ["about"])
      // eslint-disable-next-line max-len
      // вылезает CastError, хотя по логике это должна быть ValidationError, но ошибка валидации не возникает
      res.status(400).send({
        message: 'Переданы некорректные данные.',
      });
    } else {
      res.status(404).send({
        message: 'Карточка или пользователь не найдены',
      });
    }
  } else if (error.name === 'ValidationError') { // ошибки валидации схемы
    res.status(400).send({
      message: 'Переданы некорректные данные.',
    });
  } else if (error.name === 'notValidId') { // обработка ошибки с null значением
    res.status(404).send({
      message: 'Карточка или пользователь не найдены',
    });
  } else if (error.name === 'notMyCard') { // ошибка удаления чужой карточки
    res.status(403).send({
      message: 'Удаление чужой карточки невозможно',
    });
  } else if (error.name === 'MongoError' && error.code === 11000) { // регистрация по уже существующему email
    res.status(409).send({
      message: 'Данный пользователь уже зарегистрирован',
    });
  } else if (error.name === 'invalidPasswordOrEmail') {
    res.status(401).send({
      message: 'Некорректный емейл или пароль',
    });
  } else if (error.name === 'needAuth') {
    res.status(401).send({
      message: 'Необходима авторизация',
    });
  } else { // ошибка по умолчанию
    res.status(500).send({
      message: 'На сервере произошла ошибка',
    });
  }
}

module.exports = sendError;
