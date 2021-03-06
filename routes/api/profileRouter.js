const router = require("express").Router();

const {
  profileByHandleController,
  profileByUserIdController,
  profileCurrentGetController,
  profileCurrentPostController,
  profileGetAllController
} = require("../../controllers/profileController");

const auth = require("../../controllers/authController").authCheckController;

router.get("/handle/:handle", profileByHandleController);

router.get("/user/:user_id", auth, profileByUserIdController);

router.get("/", auth, profileCurrentGetController);

router.get("/all", auth, profileGetAllController);

router.post("/", auth, profileCurrentPostController);

module.exports = router;
