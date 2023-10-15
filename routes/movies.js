const router = require('express').Router();

const {
  getMovieInfo,
  postMovieInfo,
  deleteMovieById
} = require('../controllers/movies');

router.get('/', getMovieInfo);
router.post('/', postMovieInfo);
router.delete('/:movieId', deleteMovieById);


module.exports = router;