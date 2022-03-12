const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .post("/signUp", userController.signUp)
  .post("/signIn", userController.signIn)
  .post("/create", userController.createUesr)
  .post("/randomuser", userController.randomUser)
  .get("/showuser", userController.getAllUser)
  .get("/showuser/:id", userController.getOneUser)
  .patch("/updateuser/:id", userController.updateUser)
  .delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
