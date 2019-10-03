const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    const { admin, db } = require("../util/admin");
    const config = require("../util/config");

// returns all the items from firestore
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
                res.status(500).json({ error: err.code });
            });
    }

// creates a new database entry for a item on firestore
exports.createItem =

    (req, res) => {

        // extract the form data
        let item = {
            name       : req.body.name,
            desc       : req.body.desc,
            cover      : req.body.cover,
            val        : req.body.val,
            visibleTo  : req.body.visibleTo,
            assignedTo : req.body.assignedTo
        }

        // remove fields with null values
        Object.keys(item).forEach((key) => (item[key] === null) && delete item[key]);

        // add item to collection
        db
            .collection('items')
            .add(item)
            .then(doc => {
                return res.status(200).json(doc.id);
            })
            .catch((err) => {
                res.status(500).json({ Error : err });
            });
    }

// uploads a single image to firebase storage
exports.uploadImg =

    (req, res) => {

        // find the database entry for the required item
        db
            .collection('items')
            .doc(req.params.id)
            .get()
            .then(doc => {

                // eslint-disable-next-line promise/always-return
                if (!doc.exists){
                    return res.status(400).json({ Error : "Document does not exist!" });
                }

                let photos = doc.data().photos;

                const busboy = new BusBoy({ headers: req.headers });

                let imageToBeUploaded = {};
                let imageFileName;

                // prepare the image file
                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                    // check if the file type is that of an image
                    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
                        return res.status(400).json({ typeError: 'Wrong file type submitted' });
                    }

                    // create a unique name for the image
                    const imageExtension = filename.split('.')[filename.split('.').length - 1];
                    imageFileName = `photo_${Math.round(Math.random() * 10000000).toString()}.${imageExtension}`;

                    // upload the image
                    const filepath = path.join(os.tmpdir(), imageFileName);
                    imageToBeUploaded = { filepath, mimetype };
                    file.pipe(fs.createWriteStream(filepath));
                });

                // store the image on firebase storage
                busboy.on('finish', () => {
                    // eslint-disable-next-line promise/no-nesting
                    admin
                    .storage()
                    .bucket(config.storageBucket)
                    .upload(imageToBeUploaded.filepath, {
                        resumable: false,
                        metadata: {
                            metadata: {
                                contentType: imageToBeUploaded.mimetype
                            }
                        }
                    })
                    .then(() => {

                        // determine the imageURL and add it to the item's database entry
                        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                        photos.push(imageUrl);

                        // update databse entry
                        // eslint-disable-next-line promise/no-nesting
                        return db
                                .collection('items')
                                .doc(doc.id)
                                .update({photos : photos })
                                .then(() => {
                                    return res.status(200).json("Success");
                                })
                                .catch(err => {
                                    return res.status(200).json({ Error : err});
                                })

                    })
                    .catch(err => {
                        return res.status(500).json({ uploadError : err });
                    });
                });

                busboy.end(req.rawBody);
            })
            .catch(err => {
                return res.status(400).json({ Error : err });
            })
    }