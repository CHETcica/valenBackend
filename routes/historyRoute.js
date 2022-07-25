const express = require("express");
const historyController = require("../controllers/historyController")

const router = express.Router();

router
  .post("/create", historyController.createHistory)
  .get("/showhistory", historyController.getOneHistory)
  .get("/showallhistory", historyController.getOneHistory)
module.exports = router;