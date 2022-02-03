const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// router.post('/signUp', userController.signUp);
// router.post('/signIn', userController.signIn);
router
  .post("/create", userController.createUesr)
  .get("/showuser", userController.getAllUser)
  .get("/showuser/:id", userController.getOneUser)
  .patch("/updateuser/:id", userController.updateUser)
  .delete("/deleteuser/:id",userController.deleteUser)

module.exports = router;
