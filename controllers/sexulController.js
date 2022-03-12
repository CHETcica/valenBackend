const Sexul = require("../models/sexulModel");
const AppError = require("../utility/AppError");
const tryCatch = require("../utility/tryCatch");

exports.createSexul = tryCatch(async (req, res, next) => {
  const sexul = await Sexul.create(req.body);
  res.status(201).json({
    status: "success",
    sexul,
  });
});
