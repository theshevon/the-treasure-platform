const functions = require('firebase-functions'),
      express   = require('express'),
      cors      = require('cors'),
      app       = express();

app.use(cors());

/*================================= ROUTING ==================================*/

// import routes
const userRoutes  = require("./routes/users"),
      itemRoutes  = require("./routes/items");

app.use(userRoutes);
app.use(itemRoutes);

/*============================================================================*/

exports.api = functions.https.onRequest(app);
