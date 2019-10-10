const express        = require("express");
const router         = express.Router();

const itemController  = require("../controllers/items");
const { isLoggedIn, isAuthorised }  = require("../util/middleware");

/*=================================GET ROUTES=================================*/

router.get("/items", itemController.getItems);

/*================================POST ROUTES=================================*/

router.post("/items/new", itemController.createItem);

router.post("/items/:id/img_upload", itemController.uploadImg);

/*===============================DELETE ROUTES================================*/

router.delete("/items/:id", itemController.deleteItem);

/*================================PUT ROUTES==================================*/

router.put("/items/:id/edit", itemController.modifyItem);

/*===========================================================================*/

module.exports = router;