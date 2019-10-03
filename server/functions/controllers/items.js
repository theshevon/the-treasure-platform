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

exports.createItem =

    (req, res) => {
        // check if request body is empty
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({body: 'Empty request >:('});
        }
        // parse json from request
        const res_data = JSON.parse(req.body);

        // add item to collection
        db.collection('items')
            .add({
                name: res_data.name,
                desc: res_data.desc,
                item_src: null,
                val: res_data.val,
                createdOn: new Date().toISOString(),
                visibleTo: res_data.visibleUsers,
                intUsers: null,
                assignedTo: res_data.assignedTo,
            })
            .then(ref => {
                console.log('Added item to database.');
                res.json(res_data);
            })
            .catch((err) => {
                res.status(500).json({ error: 'An error occurred :(' });
                console.error(err);
            });
    }
