const router = require("express").router();

const auth = require("../../controllers/authController").authCheckController;

router.get("/me", auth, );

router.get("/list", auth, );

router.get("/people", auth, );

router.post("/add/:id", auth, );

router.get("/check/:id", auth, );

module.exports = router;
