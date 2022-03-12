const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "config.env" });
const errorMiddleware = require("./middleware/errorMiddleware");
const AppError = require("./utility/AppError");

const userRouter = require("./routes/userRoute");
const passionRouter = require("./routes/passionRoute");
const sexRouter = require("./routes/sexulRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());


app.get("/", (req, res, next) => {
  next(new AppError("This is error", 500));
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/passion", passionRouter);
app.use("/api/v1/sexul", sexRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Not found that url",
  });
});

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connecting to database successfully"))
  .catch((err) => console.log("Can not to connected to database"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port: " + port);
});
