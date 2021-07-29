const { INCORRECT_CODE, NOTFOUND_CODE, DEFAULT_CODE } = require('./errorStatuses');
const ERROR_TYPES = require('./errorTypes');
const {
  lostUser, wrongProfileData, wrongCardId, wrongData, byDfault,
} = require('./errorMessages');

function catchErrors(nameOfHandler, res, errorName) {
  if (nameOfHandler === 'updateUser' || nameOfHandler === 'updateAvatar') {
    if (errorName === 'TypeError') {
      return res.status(NOTFOUND_CODE).send({
        message: lostUser,
      });
    }
    if (errorName === 'CastError') {
      return res.status(INCORRECT_CODE).send({
        message: wrongProfileData,
      });
    }
  }
  if (nameOfHandler === 'deleteCardById') {
    if (ERROR_TYPES.includes(errorName)) {
      return res.status(NOTFOUND_CODE).send({
        message: wrongCardId,
      });
    }
  }
  if (nameOfHandler === 'getUser') {
    if (ERROR_TYPES.includes(errorName)) {
      return res.status(NOTFOUND_CODE).send({
        message: lostUser,
      });
    }
  }
  if (nameOfHandler === 'postCards' || nameOfHandler === 'postUser' || nameOfHandler === 'putCardLike' || nameOfHandler === 'deleteCardLike') {
    if (ERROR_TYPES.includes(errorName)) {
      return res.status(INCORRECT_CODE).send({
        message: wrongData,
      });
    }
  }
  // дефолтная ошибка
  return res.status(DEFAULT_CODE).send({
    message: byDfault,
  });
}

module.exports = catchErrors;
