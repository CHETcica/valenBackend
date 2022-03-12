const express = require("express");
const sexulController = require("../controllers/sexulController")

const router = express.Router();

router
  .post("/create", sexulController.createSexul)
  // .get("/showsexul", sexulController.getAllSexul)
  // .patch("/updatesexul/:id", sexulController.updateSexul)
  // .delete("/deletesexul/:id", sexulController.deleteSexul)

module.exports = router;