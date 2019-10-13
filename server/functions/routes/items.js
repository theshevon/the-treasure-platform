const express        = require("express");
const router         = express.Router();

const itemController  = require("../controllers/items");
const { isLoggedIn, isAuthorised }  = require("../util/middleware");

/*=================================GET ROUTES=================================*/

router.get("/items", isLoggedIn, itemController.getItems);

/*================================POST ROUTES=================================*/

router.post("/items/new", isLoggedIn, itemController.createItem);

router.post("/items/:id/img_upload", isLoggedIn, itemController.uploadImg);

/*===============================DELETE ROUTES================================*/

router.delete("/items/:id", isLoggedIn, itemController.deleteItem);

/*================================PUT ROUTES==================================*/

router.put("/items/:id/edit", isLoggedIn, itemController.modifyItem);

/*===========================================================================*/

module.exports = router;