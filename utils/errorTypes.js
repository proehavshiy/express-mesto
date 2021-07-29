const ERROR_TYPES = [
  'CastError', // Mongoose could not convert a value to the type defined in the schema path.
  'TypeError', // ????? возникает, когда несуществующий _id передаешь на вход и при условии что в then есть проверка равенства id
  'ValidationError', // когда нехвататет поля или ошибка с типом данных в полях
];

module.exports = ERROR_TYPES;
