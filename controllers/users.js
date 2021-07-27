function getUsers(req, res, next) {
  res.status(200).send('возвращает всех пользователей');
}

// проверочный мидлвар
function doesUserExist(req, res, next) {
  const { userId } = req.params;
  if (userId === 'error') { // потом написать более нормальную проверку по базе
    res.send({ error: 'Такого пользователя нет' });
  }
  next();
}

function getUser(req, res, next) {
  const { userId } = req.params;
  res.status(200).send(`возвращает пользователя по userId: ${userId}`);
}

function postUser(req, res, next) {
  // В теле POST-запроса на создание пользователя передайте JSON-объект
  // с тремя полями: name, about и avatar
  const { body } = req;
  res.status(200).send(`создаёт пользователя. параметры: ${body.name}, ${body.about}, ${body.avatar}`);
}

function updateUser(req, res, next) {
  res.status(200).send('обновляет профиль');
}

function updateAvatar(req, res, next) {
  res.status(200).send('обновляет аватар');
}

module.exports = {
  doesUserExist,
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateAvatar,
};
