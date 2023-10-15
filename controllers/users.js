const User = require('../models/user');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const { MISSING_USER_MSG, DUPLICATION_EMAIL_ERROR_MSG, DEV_SECRET, PRODUCTION_MODE, DEFAULT_EXPIRATION } = require('../util/constants');
const { NODE_ENV, JWT_SECRET } = process.env;
const DuplicationError = require('../util/errors/DuplicationError');
const MissingError = require('../util/errors/MissingError');

const bcrypt = require('bcryptjs');

function handleAndSendUser(user, res) {
  if (user === null) {
    return Promise.reject(
      new MissingError(MISSING_USER_MSG),
    );
  }
  return res.send({ data: user });
}

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return handleAndSendUser(user, res);
    })
    .catch(next);
}

module.exports.patchUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => handleAndSendUser(user, res))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, email, password: hash }))
    .then(user => {
      const { name, email } = user;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === PRODUCTION_MODE ? JWT_SECRET : DEV_SECRET,
        { expiresIn: DEFAULT_EXPIRATION }
      )

      return res.status(201).send({ data: { name, email, token } });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicationError(DUPLICATION_EMAIL_ERROR_MSG));
      }
      return next(err);
    }
    );
};