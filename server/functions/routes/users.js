const express        = require("express");
const router         = express.Router();

const userController = require("../controllers/users")

/*=================================GET ROUTES=================================*/

router.get("/users", userController.getUsers);

router.get("/logout", userController.logOutUser);

/*================================POST ROUTES=================================*/

router.post("/check_invitee", userController.checkInvitee);

router.post("/register", userController.registerNewUser);

router.post("/login", userController.logInUser);

/*===========================================================================*/

module.exports = router;
