class AppError extends Error {
  constructor(message, statusCode, name = null, err = undefined) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.name = name || this.name;
    this.ownError = err;
  }
}


module.exports = AppError;
