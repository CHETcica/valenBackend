const History = require("../models/historyModel");
const AppError = require("../utility/AppError");
const tryCatch = require("../utility/tryCatch");

exports.createHistory = tryCatch(async (req, res, next) => {
  const history = await History.create(req.body);
  res.status(201).json({
    status: "success",
    history,
  });
});

exports.getOneHistory = tryCatch(async (req, res, next) => {
    const history = await History.findOne({
        _id1: req.body._id1,
        _id1: req.body._id1,
    });
    
    res.status(201).json({
      status: "success",
      history,
    });
  });