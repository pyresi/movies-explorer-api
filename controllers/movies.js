const Card = require('../models/card');
const MissingError = require('../util/errors/MissingError');
const ForbiddenError = require('../util/errors/ForbiddenError');

function handleAndSendCard(card, res) {
  if (card === null) {
    return Promise.reject(
      new MissingError('Запрашиваемая карточка не найдена'),
    );
  }
  return res.send({ data: card });
}

module.exports.getMovieInfo = (req, res, next) => {

};

module.exports.postMovieInfo = (req, res, next) => {

};

module.exports.deleteMovieById = (req, res, next) => {

};

