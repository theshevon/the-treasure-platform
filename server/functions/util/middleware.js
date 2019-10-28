const { admin, db } = require('./admin');

/**
 * Verifies that the user making the request has indeed been authenticated.
 */
exports.isLoggedIn =

    (req, res, next) => {

        let idToken;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            // extract the token
            idToken = req.headers.authorization.split('Bearer ')[1];
        } else {
            // send forbidden error as person isn't authorised to view that page
            return res.status(401).json({ error : 'Unauthorised' });
        }

        // ensure that the token was issued by *our* application
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(async decodedToken => {

                req.user = decodedToken;

                // get the user's details
                try {
                    const doc = await db
                        .collection('users')
                        .doc(req.user.uid)
                        .get();
                    return {
                        id: doc.id,
                        name: `${doc.data()["fname"]} ${doc.data()["lname"]}`,
                        email: doc.data()["email"],
                        type: doc.data()["uType"]
                    };
                }
                catch (err) {
                    console.log(err)
                    return res.status(401).json({ error : 'Unauthorised' });
                }
            })
            .then(data => {

                // add the user's details to the request
                req.user.id    = data["id"];
                req.user.name  = data["name"];
                req.user.email = data["email"];
                req.user.type  = data["type"];

                return next();
            })
            .catch(err => {
                console.log(err);
                return res.status(401).json({ error : 'Unauthorised' });
            });
    }

/**
 * Verifies that the user making the request is authorised to do so.
 */
exports.isAuthorised =

    (req, res, next) => {

        // only allow the request to advance if the user is a Primary User.
        if (req.user.type === 0){
            return next();
        } else {
            return res.status(401).json({ error : 'Unauthorised' });
        }
    }