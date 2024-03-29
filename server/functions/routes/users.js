const express        = require("express");
const router         = express.Router();

const userController               = require("../controllers/users")
const { isLoggedIn, isAuthorised } = require("../util/middleware")

/*=================================GET ROUTES=================================*/

router.get("/users", isLoggedIn, userController.getSecondaryUsers);

/*================================POST ROUTES=================================*/

router.post("/check_invitee", userController.checkInvitee);

router.post("/register", userController.registerNewUser);

router.post("/login", userController.logInUser);

router.post("/invite", isLoggedIn, isAuthorised, userController.inviteNewUsers);

router.post("/support", isLoggedIn, userController.sendSupportMessage);

/*=================================PUT ROUTES=================================*/

router.put("/users/:id/img_upload", userController.uploadImg);

/*============================================================================*/

module.exports = router;
