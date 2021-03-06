const User = require("../models/userModel");
const AppError = require("../utility/AppError");
const tryCatch = require("../utility/tryCatch");
const jwt = require("jsonwebtoken");
const { signUpReq, signInReq } = require("../validator/request/userRequest");

exports.signUp = tryCatch(async (req, res, next) => {
  console.log(req.body);
  const reqBody = await signUpReq(req.body, next);
  const user = new User(reqBody);
  // const user = await User.insert(reqBody);
  await user.save();
  console.log(user);
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

exports.randomUser = tryCatch(async (req, res, next) => {
  // const user = await User.findOne(req.body.gender);
  const user = await User.findOne({
    gender: req.body.gender,
    passion: { $in: req.body.passion },
    _id: { $nin: req.body._id },
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: req.body.location },
        $maxDistance: req.body.MaxDistance,
      },
    },
  });
  res.status(201).json({
    status: "success",
    user,
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

exports.likeUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    userDetails: {
      likes: req.body.likes 
    }
  });
  res.status(200).json({
    status: "success",  
    user,
  });
});

exports.unlikeUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    userDetails: {
      unlikes: req.body.unlikes 
    }
  });
  res.status(200).json({
    status: "success",  
    user,
  });
});

exports.superlikeUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    userDetails: {
      superlikes: req.body.superlikes 
    }
  });
  res.status(200).json({
    status: "success",  
    user,
  });
});

exports.updateUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
  });
  res.status(200).json({
    status: "success",
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
