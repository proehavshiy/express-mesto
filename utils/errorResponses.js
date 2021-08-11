const { wrongId, wrongData, byDfault } = require('./errorMessages');

function catchErrors(nameOfHandler, res, error) {
  console.log('error.message', error.message)
  if (error.name === 'CastError') {
    if (error.path && error.path !== '_id') { // при нарушении типа данных в полях запроса (в обновлении юзера и аватара - напр - "about": ["about"])
      // eslint-disable-next-line max-len
      // вылезает CastError, хотя по логике это должна быть ValidationError, но ошибка валидации не возникает
      return res.status(404).send({
        message: wrongData,
      });
      // eslint-disable-next-line no-else-return
    } else if (nameOfHandler === 'deleteCardById' || nameOfHandler === 'getUser') { // статус 400 для удаления карточки и получения юзера, как ревьюер указал
      return res.status(400).send({
        message: wrongId,
      });
    } else {
      return res.status(400).send({
        message: wrongId,
      });
    }
  } else if (error.name === 'ValidationError') { // ошибки валидации схемы
    return res.status(400).send({
      message: wrongData,
    });
  } else if (error.message === 'notValidId') { // обработка ошибки с null значением
    return res.status(404).send({
      message: wrongId,
    });
  } else if (error.message === 'notMyCard') {
    return res.status(403).send({ message: 'Удаление чужой карточки невозможно' });
  } else { // ошибка по умолчанию
    return res.status(500).send({
      message: byDfault,
    });
  }
}

module.exports = catchErrors;
