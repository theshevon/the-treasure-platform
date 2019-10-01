const functions = require('firebase-functions'),
      express   = require('express'),
      app       = express();

// import routes
const userRoutes  = require("./routes/users"),
      itemRoutes  = require("./routes/items"),
      indexRoutes = require("./routes/index");

/*==================================routing===================================*/

app.use(userRoutes);
app.use(itemRoutes);
app.use(indexRoutes);

/*============================================================================*/

// TODO: figure out how to change region to Australia (currently
// "australia-southeast1" is an invalid argument for .regions())
exports.api = functions.https.onRequest(app);
