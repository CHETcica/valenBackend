const AppError = require('../utility/AppError');

const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // return res.status(err.statusCode).json({
  //   status: 'error',
  //   message: 'Something went wrong',
  // });

  return res.status(err.statusCode).json({
    status: 'error',
    message: err,
  });
};

const handleCastErrorMonDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateFieldMonDB = (err) => {
  const key = Object.keys(err.keyValue);
  const message = `Duplicate ${key} field value: ${err.keyValue[key]}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidateErrorMonDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJoiValidate = (err) => {
  const message = err.ownError.details
    .map((el) => el.message.replaceAll(/\"/g, ''))
    .join('/n');

  return new AppError(message, 400);
};

const handlerJWTError = () =>
  new AppError('Invalid token. Please log again!', 401);

const handlerTokenExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    error = handleCastErrorMonDB(err);
  }

  if (err.code === 11000) {
    error = handleDuplicateFieldMonDB(err);
  }

  if (err._message && err.errors) {
    error = handleValidateErrorMonDB(err);
  }

  if (err.name === 'joi') {
    error = handleJoiValidate(err);
  }

  if (err.name === 'JsonWebTokenError') {
    error = handlerJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    error = handlerTokenExpiredError();
  }

  sendError(error, req, res);
};
