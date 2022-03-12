const Passion = require("../models/passionModel");
const AppError = require("../utility/AppError");
const tryCatch = require("../utility/tryCatch");

exports.createPassion = tryCatch(async (req, res, next) => {
  const passion = await Passion.create(req.body);
  res.status(201).json({
    status: "success",
    passion,
  });
});

exports.getAllPassion = tryCatch(async (req, res, next) => {
  const passion = await Passion.find();
  res.status(201).json({
    status: "success",
    passion,
  });
});

exports.updatePassion = tryCatch(async (req, res, next) => {
  const passion = await Passion.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    message: "Update succesfully",
    passion,
  });
});

exports.deletePassion = tryCatch(async (req, res, next) => {
  await Passion.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    passion: null,
  });
});