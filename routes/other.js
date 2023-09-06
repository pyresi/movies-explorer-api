const router = require('express').Router(); // создали роутер
const { MISSING_ROUTE_ERROR_MSG } = require('../util/constants');
const MissingError = require('../util/errors/MissingError');

router.all('/', (req, res, next) => next(new MissingError(MISSING_ROUTE_ERROR_MSG)));

module.exports = router;
