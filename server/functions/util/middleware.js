const { admin, db } = require('./admin');

exports.isLoggedIn =

    (req, res, next) => {
        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){

            // extract the token
            idToken = req.headers.authorization.split('Bearer ')[1];
        } else {

            // send forbidden error as person isn't authorised to view that page
            return res.status(403).json({ error : 'Unauthorised' });
        }

        // ensure that the token was issued by *our* application
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(decodedToken => {
                req.user = decodedToken;

                // get the user's ID and (full) name
                // eslint-disable-next-line promise/no-nesting
                return db
                        .collection('users')
                        .doc(req.user.uid)
                        .get()
                        .then(doc => {
                            return {
                                        id   : doc.id,
                                        name : `${doc.data()['fname']} ${doc.data()['lname']}`
                                    }
                        })
                        .catch(err => {
                            return res.status(403).json(err);
                        })
            })
            .then(data => {
                req.user.name = data["name"];
                return next();
            })
            .catch(err => {
                return res.status(403).json(err);
            })
    }