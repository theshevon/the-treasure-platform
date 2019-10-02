const express        = require("express");
const router         = express.Router();

const itemController = require("../controllers/items");

/*=================================GET ROUTES=================================*/

router.get("/items", itemController.getItems);

// app.get("/item/:id", getSpecificItem)

/*================================POST ROUTES=================================*/

router.post("/items", itemController.createItem);

/*===========================================================================*/

module.exports = router;