const AppError = require('../utility/AppError');
const tryCatch = require('../utility/tryCatch');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = tryCatch(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged on', 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_KEY);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(new AppError('The user not exist', 401));
  }

  req.user = currentUser;
  next();
});

// restrict('gm', 'manager')

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission', 403));
    }
    next();
  };
};
