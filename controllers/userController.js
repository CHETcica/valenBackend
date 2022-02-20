const User = require("../models/userModel");
const AppError = require("../utility/AppError");
const tryCatch = require("../utility/tryCatch");
const jwt = require('jsonwebtoken');
const { signUpReq, signInReq } = require("../validator/request/userRequest");

exports.signUp = tryCatch(async (req, res, next) => {
  const reqBody = await signUpReq(req.body, next);

  const user = await User.create(reqBody);
  user.password = undefined;

  res.status(201).json({
    status: "success",
    user,
  });
});
exports.signIn = tryCatch(async (req, res, next) => {
  const reqBody = await signInReq(req.body, next);
  
  
  const user = await User.findOne({ username: reqBody.username }).select(
    "+password"
  );

  if (!user || !(await user.checkPassword(reqBody.password, user.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXP,
  });

  res.json({
    status: "success",
    user,
    token,
  });
});
exports.createUesr = tryCatch(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    user,
  });
});
exports.getAllUser = tryCatch(async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({
    status: "success",
    user,
  });
});
exports.getOneUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user,
  });
});
exports.updateUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    message: "Update succesfully",
    user,
  });
});
exports.deleteUser = tryCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    user: null,
  });
});
