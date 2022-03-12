const express = require("express");
const passionController = require("../controllers/passionController");

const router = express.Router();

router
  .post("/create", passionController.createPassion)
  .get("/showpassion", passionController.getAllPassion)
  .patch("/updatepassion/:id", passionController.updatePassion)
  .delete("/deletepassion/:id", passionController.deletePassion);

module.exports = router;