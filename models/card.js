const mongoose = require('mongoose');
const { ObjectId } = require('mongoose/lib/drivers/node-mongodb-native');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: [{
    type: ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле.
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// eslint-disable-next-line max-len
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив(поле default );
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.
