// controllers/users.js
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const { DEV_SECRET, PRODUCTION_MODE, DEFAULT_EXPIRATION } = require('../util/constants');
const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === PRODUCTION_MODE ? JWT_SECRET : DEV_SECRET,
        { expiresIn: DEFAULT_EXPIRATION }
      );

      res.send({ token });
    })
    .catch(next);
};