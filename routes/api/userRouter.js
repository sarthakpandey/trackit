const router = require("express").Router();

const {
  currentUserController,
  getAllUsersController,
  getConnectedPeopleController,
  addController,
  checkAddedController
} = require("../../controllers/userController");

const auth = require("../../controllers/authController").authCheckController;

router.get("/me", auth, currentUserController);

router.get("/list", auth, getAllUsersController);

router.get("/people", auth, getConnectedPeopleController);

router.post("/add/:id", auth, addController);

router.get("/check/:id", auth, checkAddedController);

module.exports = router;
