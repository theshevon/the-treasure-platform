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
                    let item = {id : doc.id};
                    items.push(Object.assign(item, doc.data()));
                });
                return res.json(items);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
    }

exports.getSpecificItem =

    (req, res) => {
        db.collection('items')
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    //console.log(req.substring("/item/".length));       //DELETE
                    if (req.params.id == doc.id) {
                        return res.json({
                            itemId: doc.id,
                            name: doc.data().name
                        });
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err.code });
            });
    }
