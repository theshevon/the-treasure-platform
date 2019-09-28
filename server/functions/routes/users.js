const express        = require("express");
const router         = express.Router();

const userController = require("../controllers/users")

/*=================================GET ROUTES=================================*/

router.get("/users", userController.getUsers);

// router.get("/logout", userController.logoutUser);

/*================================POST ROUTES=================================*/

router.post("/register", userController.registerNewUser);

router.post("/login", userController.logInUser);

/*===========================================================================*/

module.exports = router;