// Errors
module.exports.DEFAULT_ERROR_MSG = 'На сервере произошла ошибка';
module.exports.MISSING_MOVIE_MSG = 'Запрашиваемый фильм не найден';
module.exports.MISSING_USER_MSG = 'Запрашиваемый пользователь не найден';
module.exports.FORBIDDEN_DELETION_OTHER_USER_MOVIE_MSG = 'Невозможно удалить чужой фильм';
module.exports.DUPLICATION_EMAIL_ERROR_MSG = 'Ошибка авторизации: такой email уже существует';

module.exports.AUTHORIZATION_ERROR_MSG = 'Необходима авторизация';
module.exports.BAD_URL_MSG = 'Некорректный URL';
module.exports.INVALID_AUTHORIZATION_ERROR_MSG = 'Неправильные почта или пароль';
module.exports.MISSING_ROUTE_ERROR_MSG = 'Нет такого пути';

module.exports.BEARER_STRING = 'Bearer ';

module.exports.REQUEST_LOG_FILE = 'request.log';
module.exports.ERROR_LOG_FILE = 'error.log';


module.exports.HTTP_SUCCESS_CODE = 201;

module.exports.DEV_SECRET = 'dev-secret';

module.exports.PRODUCTION_MODE = 'production';
module.exports.DEFAULT_EXPIRATION = '7d';

module.exports.DEFAULT_PORT = 3000;
module.exports.DEFAULT_DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';