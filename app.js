require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./util/handleErrors');
const { celebrate, Joi, errors } = require('celebrate');
const { DEFAULT_PORT, PRODUCTION_MODE, DEFAULT_DB_URL } = require('./util/constants');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, PORT = DEFAULT_PORT, DB_URL } = process.env;

const app = express();
app.use(helmet());

mongoose
  .connect(NODE_ENV === PRODUCTION_MODE ? DB_URL : DEFAULT_DB_URL, {
    useUnifiedTopology: true,
  });

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.use(requestLogger);

const allowedCors = [
  'https://api.pyresi.movies.nomoredomainsicu.ru',
  'http://api.pyresi.movies.nomoredomainsicu.ru',
  'https://pyresi.movies.nomoredomainsicu.ru',
  'http://pyresi.movies.nomoredomainsicu.ru',
  'localhost:3000'
];

app.use(function (req, res, next) {
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}), createUser);

app.use(auth);

app.post('/signout', () => { });

const userRouter = require('./routes/users');
// импортируем роутер
app.use('/users', userRouter); // запускаем

const movieRouter = require('./routes/movies');
// импортируем роутер
app.use('/movies', movieRouter); // запускаем

const otherRouter = require('./routes/other');


app.use('/*', otherRouter);

app.use(errorLogger);

app.use(errors());


app.use((err, req, res, next) => {
  return handleErrors(res, err);
});