const router = require("express").Router();
const Controller = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares");
const { generateTokenForUser } = require("../helpers/jwt");


router.post("/users/register", Controller.usersRegister);
router.post("/users/login", Controller.usersLogin);

router.get("/users", authentication, Controller.getUserByAccessToken);

module.exports = router;
