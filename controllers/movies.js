const Movie = require('../models/movie');
const MissingError = require('../util/errors/MissingError');
const ForbiddenError = require('../util/errors/ForbiddenError');

function handleAndSendMovie(movie, res) {
  if (movie === null) {
    return Promise.reject(
      new MissingError('Запрашиваемый фильм не найден'),
    );
  }
  return res.send({ data: movie });
}

module.exports.getMovieInfo = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.postMovieInfo = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  const owner = req.user._id;


  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return Promise.reject(
          new MissingError('Запрашиваемый фильм не найден'),
        );
      }

      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
      }
      else {
        return Promise.reject(new ForbiddenError('Невозможно удалить чужой фильм'));
      }
    })
    .then((movie) => handleAndSendMovie(movie, res))
    .catch((err) => {
      next(err);
    });
};

