const winston = require("winston");

class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

const error = (err, req, res, next) => {
  // log the exception
  winston.log("error", err.message);

  const { status = 500, message = "An error has occured." } = err;
  res.status(status).json(message);
};

module.exports = AppError;
