const Movie = require('../models/movie');
const MissingError = require('../util/errors/MissingError');
const ForbiddenError = require('../util/errors/ForbiddenError');
const { MISSING_MOVIE_MSG, FORBIDDEN_DELETION_OTHER_USER_MOVIE_MSG, HTTP_SUCCESS_CODE } = require('../util/constants');

function handleAndSendMovie(movie, res) {
  if (movie === null) {
    return Promise.reject(
      new MissingError(MISSING_MOVIE_MSG),
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
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;

  const owner = req.user._id;


  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner })
    .then((movie) => res.status(HTTP_SUCCESS_CODE).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return Promise.reject(
          new MissingError(MISSING_MOVIE_MSG),
        );
      }

      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
      }
      else {
        return Promise.reject(new ForbiddenError(FORBIDDEN_DELETION_OTHER_USER_MOVIE_MSG));
      }
    })
    .then((movie) => handleAndSendMovie(movie, res))
    .catch((err) => {
      next(err);
    });
};

