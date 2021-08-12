class ErrorConstructor extends Error {
  constructor(name) {
    super(name);
    // this.nameOfHandler = nameOfHandler;
    this.name = name;
    // this.statusCode = this._getStatusCode();
    // eslint-disable-next-line no-underscore-dangle
    // this.errorComposition = this._getErrorComposition();
    // console.log('nameOfHandler:', this.nameOfHandler);
    // console.log('error:', this.error);
    // console.log('error.message:', this.error.message)
    // console.log('this.errorComposition:', this.errorComposition);
  }

  // _getErrorComposition() {
  //   if (this.error.name === 'CastError') {
  // eslint-disable-next-line max-len
  //     if (this.error.path && this.error.path !== '_id') { // при нарушении типа данных в полях запроса (в обновлении юзера и аватара - напр - "about": ["about"])
  //       // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  //       // вылезает CastError, хотя по логике это должна быть ValidationError, но ошибка валидации не возникает
  //       return {
  //         message: 'Переданы некорректные данные.',
  //         status: 404,
  //       };
  //       // eslint-disable-next-line no-else-return
  // eslint-disable-next-line max-len
  //     } else if (this.nameOfHandler === 'deleteCardById' || this.nameOfHandler === 'getUser') { // статус 400 для удаления карточки и получения юзера, как ревьюер указал
  //       return {
  //         message: 'Карточка или пользователь не найдены',
  //         status: 400,
  //       };
  //     } else {
  //       return {
  //         message: 'Карточка или пользователь не найдены',
  //         status: 400,
  //       };
  //     }
  //   } else if (this.error.name === 'ValidationError') { // ошибки валидации схемы
  //     return {
  //       message: 'Переданы некорректные данные.',
  //       status: 400,
  //     };
  // eslint-disable-next-line max-len
  //   } else if (this.error.name === 'notValidId') { // обработка ошибки с null значением //error.name - DocumentNotFoundError
  //     return {
  //       message: 'Карточка или пользователь не найдены',
  //       status: 404,
  //     };
  //   } else if (this.error.name === 'notMyCard') {
  //     return {
  //       message: 'Удаление чужой карточки невозможно',
  //       status: 403,
  //     };
  //   } else { // ошибка по умолчанию
  //     return {
  //       message: 'На сервере произошла ошибка',
  //       status: 500,
  //     };
  //   }
  // }
}

module.exports = ErrorConstructor;
