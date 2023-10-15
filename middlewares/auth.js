// middlewares/auth.js

const jwt = require('jsonwebtoken');
const AuthorizationError = require('../util/errors/AuthorizationError');
const { AUTHORIZATION_ERROR_MSG, BEARER_STRING, PRODUCTION_MODE, DEV_SECRET } = require('../util/constants');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER_STRING)) {
    return next(new AuthorizationError(AUTHORIZATION_ERROR_MSG));
  }

  const token = authorization.replace(BEARER_STRING, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === PRODUCTION_MODE ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return next(new AuthorizationError(AUTHORIZATION_ERROR_MSG));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};