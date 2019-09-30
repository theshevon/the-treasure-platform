const express        = require("express");
const router         = express.Router();

const idxController = require("../controllers/index");

/*=================================GET ROUTES=================================*/

// -- landing page
router.get("/", (req, res) => res.redirect("/items"));

// error page
router.get("/*", idxController.showError);

/*===========================================================================*/

module.exports = router;
