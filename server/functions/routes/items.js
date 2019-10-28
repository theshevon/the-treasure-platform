const express        = require("express");
const router         = express.Router();

const itemController                = require("../controllers/items");
const { isLoggedIn, isAuthorised }  = require("../util/middleware");

/*=================================GET ROUTES=================================*/

router.get("/items", isLoggedIn, itemController.getItems);

/*================================POST ROUTES=================================*/

router.post("/items/new", isLoggedIn, isAuthorised, itemController.createItem);

router.post("/items/:id/img_upload", isLoggedIn, isAuthorised, itemController.uploadImg);

/*===============================DELETE ROUTES================================*/

router.delete("/items/:id", isLoggedIn, isAuthorised, itemController.deleteItem);

/*================================PUT ROUTES==================================*/

router.put("/items/:iid/intUsers", isLoggedIn, isAuthorised, itemController.toggleEOI);

router.put("/items/:iid/assign/:uid", isLoggedIn, isAuthorised, itemController.assignItem);

/*============================================================================*/

module.exports = router;