const express        = require("express");
const router         = express.Router();

const itemController    = require("../controllers/items");
const { isLoggedIn }  = require("../util/middleware");

/*=================================GET ROUTES=================================*/

router.get("/items", isLoggedIn, itemController.getItems);

/*================================POST ROUTES=================================*/

router.post("/items/new", itemController.createItem);

router.post("/items/:id/img_upload", isLoggedIn, itemController.uploadImg);

/*===============================DELETE ROUTES================================*/

router.delete("/items/:id", itemController.deleteItem);

/*===========================================================================*/

module.exports = router;