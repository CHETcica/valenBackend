const User = require('../models/userModel');
//const AppError = require('../utility/AppError');
const tryCatch = require('../utility/tryCatch');

exports.createUesr = tryCatch(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    user,
  });
});
exports.getAllUser = tryCatch(async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({
    status: 'success',
    user,
  });
});
exports.getOneUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    user,
  });
});
exports.updateUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.deleteUser = tryCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    user: null,
  });
});