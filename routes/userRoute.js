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
  .patch("/like/:id", userController.likeUser)
  .patch("/unlike/:id", userController.unlikeUser)
  .patch("/superlike/:id", userController.superlikeUser)
  .patch("/addfriendlist/:id", userController.addFriendUser)
  .delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
