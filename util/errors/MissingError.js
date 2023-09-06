const { HTTP_MISSING_CODE } = require("../constants");

class MissingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingError';
    this.statusCode = HTTP_MISSING_CODE;
  }
}

module.exports = MissingError;
