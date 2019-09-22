const functions = require('firebase-functions'),
      express   = require('express'),
      app       = express();

// mount controllers
const { registerNewUser, logInUser } = require("./controllers/users");
const ItemsController   = require("./controllers/items");

/*=================================ROUTING====================================*/

// landing route
app.get("/", ItemsController.getItems);

// admin routes
app.post("/register", registerNewUser); // registration route
app.post("/login", logInUser); // login route

// item get routes
app.get("/items", ItemsController.getItems);
app.get("/item/:id", ItemsController.getSpecificItem);
//app.get("/item/create", getCreateItemPage);

// item post routes
app.post("/item/create", ItemsController.createItem);

/*============================================================================*/

// TODO: figure out how to change region to Australia (currently
// "australia-southeast1" is an invalid argument for .regions())
exports.api = functions.https.onRequest(app);
