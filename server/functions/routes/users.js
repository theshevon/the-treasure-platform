const express        = require("express");
const router         = express.Router();

const userController = require("../controllers/users")
const { isLoggedIn } = require("../util/middleware")

/*=================================GET ROUTES=================================*/

router.get("/user", isLoggedIn, userController.getAuthenticatedUser);

router.get("/users", isLoggedIn, userController.getSecondaryUsers);

router.get("/logout", isLoggedIn, userController.logOutUser);


/*================================POST ROUTES=================================*/

router.post("/check_invitee", isLoggedIn, userController.checkInvitee);

router.post("/register", userController.registerNewUser);

router.post("/login", userController.logInUser);

// router.post("/invite", userController.inviteNewUsers);

//router.post("/email", userController.sendMailToAddress);
/*===========================================================================*/

module.exports = router;
