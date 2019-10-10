const functions     = require('firebase-functions');
const { admin, db } = require("../util/admin"),
      BusBoy        = require('busboy'),
      config        = require("../util/config"),
      path          = require('path'),
      fs            = require('fs'),
      os            = require('os');

const { validateItemData } = require("../util/validators");

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

                // sort in chronological order
                items.sort((item1, item2) => item1.createdOn.toDate() - item2.createdOn.toDate());
                return res.json(items);
            })
            .catch((err) => {
                res.status(500).json({ error: err.code });
            });
    }

getSecondaryUsers = async () => {
    try {
        const users = db.collection('users')
                        .get()
                        .then((data) => {
                            // extract all userIDs
                            let users = [];
                            data.forEach((doc) => {
                                if (doc.data().utype === 1){
                                    let user = {
                                                uid : doc.id,
                                                name : doc.data().fname + " " + doc.data().lname,
                                                };
                                    users.push(user);
                                    console.log(doc.id);
                                }
                            });
                            return users;
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err.code });
                        });
        return users;
    } catch (err) {
        return -1;
    }
}

// creates a new database entry for a item on firestore
exports.createItem =

    async (req, res) => {

        // extract the form data
        let item = {
            name       : req.body.name,
            desc       : req.body.desc,
            cover      : req.body.cover,
            visibleTo  : req.body.visibleTo,
            assignedTo : req.body.assignedTo,
            intUsers   : [],
            photos     : [],
            createdOn  : admin.firestore.FieldValue.serverTimestamp()
        }

        const users = await getSecondaryUsers();

        if (users === -1){
            return res.status(500).json({"general" : "Sorry, something went wrong."});
        }

        // carry out validation
        const { valid, errors } = validateItemData(item, users);
        if (!valid) return res.status(400).json(errors);

        // add item to collection
        db
            .collection('items')
            .add(item)
            .then(doc => {
                return res.status(200).json(doc.id);
            })
            .catch((err) => {
                res.status(400).json({ Error : err });
            });
    }

// uploads a single image to firebase storage
exports.uploadImg =

    // Response codes:
    // 200 :- No Error
    // 101 :- Error : Document does not exist
    // 102 :- Error : Incorrect file type
    // 103 :- Error : Failed to link image URI to database entry
    // 104 :- Error : Failed to upload image to firebase storage
    // 105 :- Error : Other error

    (req, res) => {

        // find the database entry for the required item
        db
            .collection('items')
            .doc(req.params.id)
            .get()
            .then(doc => {

                // eslint-disable-next-line promise/always-return
                if (!doc.exists){
                    return res.status(400).json({ code : 101 });
                }

                let photos = doc.data()["photos"];

                const busboy = new BusBoy({ headers: req.headers });

                let imageToBeUploaded = {};
                let imageFileName;

                // prepare the image file
                busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                    // check if the file type is that of an image
                    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
                        return res.status(400).json({ code : 102 });
                    }

                    // create a unique name for the image
                    const imageExtension = filename.split('.')[filename.split('.').length - 1];
                    imageFileName = `${req.params.id}_photo_${Math.round(Math.random() * 10000000).toString()}.${imageExtension}`;

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
                                .update({ photos : photos })
                                .then(() => {
                                    return res.status(200).json({ code : 200 });
                                })
                                // eslint-disable-next-line handle-callback-err
                                .catch(err => {
                                    return res.status(400).json({ code : 103 });
                                })

                    })
                    // eslint-disable-next-line handle-callback-err
                    .catch(err => {
                        return res.status(400).json({ code : 104 });
                    });
                });

                busboy.end(req.rawBody);
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
                return res.status(400).json({ code : 105 });
            })
    }

// firebase function to automatically delete image files from firebase storage
// when an item's database entry is deleted
// THIS ISN'T WORKING
exports.deleteImages = functions.firestore
    .document('items/{itemId}')
    .onDelete((snap, context) => {

        const { itemId } = context.params;

        // delete images
        const bucket = admin.storage().bucket(config.storageBucket);
        return bucket.deleteFiles({
            prefix: `${itemId}`
        });
    });

// delete database entry
function deleteItemDatabase (itemId, res) {
    db
    .collection('items')
    .doc(itemId)
    .delete()
    .then(response => {
        console.log("database delete");
        // need to wait some reason so that the image is deleted
        setTimeout(function(){
            res.sendStatus(200);
        }, 1000);

    })
    .catch(err => {
        setTimeout(function(){
            res.sendStatus(401);
        }, 1000);
    });
}

// deletes an item and images from database
exports.deleteItem =

  (req, res) => {
        var imagesDeleted = 0;
        // delete images
        db.collection('items').doc(req.params.id).get().then(doc => {
            photos = doc.data().photos;
            console.log("image delete");
            photos.forEach(function(photo) {
                var imgName = photo.split(/\/o\/|\?/)[1];
                console.log(imgName);
                admin.storage().bucket(config.storageBucket).deleteFiles({
                    prefix: `${imgName}`
                });
                imagesDeleted ++;
                // when all images are deleted, delete from database
                if (imagesDeleted === photos.length) {
                    deleteItemDatabase(req.params.id, res);
                }
            });
        }).catch(err => {
            console.log(err);
        });


  }

