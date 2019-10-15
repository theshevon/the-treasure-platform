const express        = require("express");
const router         = express.Router();

const userController = require("../controllers/users")
const { isLoggedIn } = require("../util/middleware")

/*=================================GET ROUTES=================================*/

router.get("/user", isLoggedIn, userController.getAuthenticatedUser);

router.get("/users", userController.getSecondaryUsers);

router.get("/logout", isLoggedIn, userController.logOutUser);

/*================================POST ROUTES=================================*/

router.post("/check_invitee", userController.checkInvitee);

router.post("/register", userController.registerNewUser);

router.post("/login", userController.logInUser);

router.post("/invite", isLoggedIn, userController.inviteNewUsers);

/*===========================================================================*/

module.exports = router;
