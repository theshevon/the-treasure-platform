const { db } = require('../util/admin');
const firebase = require('firebase');
const config = require('../util/config');

exports.getItems =

    (req, res) => {
        db.collection('items')
            .get()
            .then((data) => {
                let items = [];
                data.forEach((doc) => {
                    items.push({
                        itemId: doc.id,
                        name: doc.data().name
                    });
                });
                return res.json(items);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
    }
