const express        = require("express");
const router         = express.Router();

const testsController = require("../controllers/tests");

/*=================================GET ROUTES=================================*/

// test image upload
router.post("/upload_img", testsController.uploadImg);

/*===========================================================================*/

module.exports = router;