const functions     = require('firebase-functions');
const { admin, db } = require("../util/admin"),
      BusBoy        = require('busboy'),
      config        = require("../util/config"),
      path          = require('path'),
      fs            = require('fs'),
      os            = require('os');

const { validateItemData } = require("../util/validators");

/**
 * Fetches all the items from firestore.
 */
exports.getItems =

    async (req, res) => {

        return await db
                        .collection('items')
                        .get()
                        .then(data => {

                            let items = [];
                            let uid   = req.user.id;
                            let utype = req.user.type;

                            // if the user is a PU, send back all the items
                            // else, filter the items based on visibility for that user
                            data.forEach(doc => {
                                if (utype === 0 || doc.data()["visibleTo"].includes(uid)){
                                    let item = {id : doc.id};
                                    items.push(Object.assign(item, doc.data()));
                                }
                            });

                            // sort the items in chronological order
                            items.sort((item1, item2) => item1.createdOn.toDate() - item2.createdOn.toDate());

                            return res.status(200).json(items);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).json({ error: err.code });
                        });
    }

/**
 * Creates a new item and stores it in firestore.
 */
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

        let SUs = await getSecondaryUsers();

        if (SUs === -1){
            return res.status(500).json({"general" : "Sorry, something went wrong."});
        }

        // carry out validation
        const { valid, errors } = validateItemData(item, SUs);
        if (!valid) return res.status(400).json(errors);

        // add item to collection
        return await db
                        .collection('items')
                        .add(item)
                        .then(doc => {
                            return res.status(200).json(doc.id);
                        })
                        .catch((err) => {
                            console.log(err)
                            return res.status(400).json({"general" : "Sorry, something went wrong."});
                        });
    }

// uploads a single image to firebase storage
exports.uploadImg =

    async (req, res) => {

        const errMsg = "Sorry, something went wrong.";

        // find the database entry for the required item
        return await db
                    .collection('items')
                    .doc(req.params.id)
                    .get()
                    .then(doc => {

                        // eslint-disable-next-line promise/always-return
                        if (!doc.exists){
                            console.log("Err: document does not exist!");
                            return res.status(400).json({ general : errMsg });
                        }

                        let photos = doc.data()["photos"];

                        const busboy = new BusBoy({ headers: req.headers });

                        let imageToBeUploaded = {};
                        let imageFileName;

                        // prepare the image file
                        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

                            // check if the file type is that of an image
                            if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
                                console.log("Err: incorrect file type");
                                return res.status(400).json({ general : errMsg });
                            }

                            // create a unique name for the image
                            const imageExtension = filename.split('.')[filename.split('.').length - 1];
                            imageFileName = `items_${req.params.id}_${Math.round(Math.random() * 10000000).toString()}.${imageExtension}`;

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
                            .then(async () => {

                                // determine the imageURL and add it to the item's database entry
                                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                                photos.push(imageUrl);

                                // update databse entry
                                try {
                                    await db
                                        .collection('items')
                                        .doc(doc.id)
                                        .update({ photos: photos });
                                    return res.status(200).json("Success!");
                                }
                                catch (err) {
                                    console.log("Err: Failed to link image URI to database entry!");
                                    console.log(err);
                                    return res.status(400).json({ general : errMsg });
                                }

                            })
                            .catch(err => {
                                console.log("Err: Failed to upload image to firebase storage")
                                console.log(err);
                                return res.status(400).json({ general : errMsg });
                            });
                        });

                        busboy.end(req.rawBody);

                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).json({ code : 105 });
                    });
    }

/**
 * Deletes an item and its photos from firebase.
 */
exports.deleteItem =

  async (req, res) => {

        let iid = req.params.id;

        // delete all the photos
        try{
            await db
                    .collection('items')
                    .doc(iid)
                    .get()
                    .then(doc => {

                        let photos = doc.data().photos;

                        // delete each photo from firebase storage
                        photos.forEach(async photo => {

                            var imgName = photo.split(/\/o\/|\?/)[1];

                            await admin
                                    .storage()
                                    .bucket(config.storageBucket)
                                    .deleteFiles({ prefix: `${imgName}` });
                        });
                        return;
                    });
        } catch(err){
            console.log(err);
            return res.status(400).json("Sorry, something went wrong.");
        }

        // now, delete the item from the database
        return await db
                        .collection('items')
                        .doc(iid)
                        .delete()
                        .then(resp => {
                            return res.status(200).json("Successfully deleted item.");
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(400).json("Sorry, something went wrong.");
                        });
  }

/**
 * Toggles a user's expression of interest in a specific item.
 */
exports.toggleEOI =

    async (req, res) => {

        // iid - item id
        let iid = req.params.iid;
        // uid - user id
        let uid = req.user.id;

        return await db
                        .collection('items')
                        .doc(iid)
                        .get()
                        .then(async itemDoc => {

                            if (!itemDoc.exists){
                                return res.status(400).json({"general" : "Sorry, something went wrong."});
                            }

                            // validate userID
                            // eslint-disable-next-line promise/no-nesting
                            return await db
                                            .collection('users')
                                            .doc(uid)
                                            .get()
                                            .then(async userDoc => {

                                                if (!userDoc.exists){
                                                    throw new Error("Invalid user id");
                                                }

                                                // fetch the intUsers arrays
                                                let intUsers = itemDoc.data()["intUsers"];

                                                // toggle the user's interest in the item
                                                if (!intUsers.includes(uid)){
                                                    // if not in it, add the uid to the list
                                                    intUsers.push(uid);
                                                } else {
                                                    // else, remove the uid from the list
                                                    let index = intUsers.indexOf(intUsers);
                                                    intUsers.splice(index, 1);
                                                }

                                                try {
                                                    await db
                                                        .collection('items')
                                                        .doc(iid)
                                                        .update({ intUsers : intUsers });
                                                    return res.status(200).json("Success");
                                                }
                                                catch (err) {
                                                    console.log(err);
                                                    throw new Error(err);
                                                }
                                            })
                                            .catch (err => {
                                                console.log(err);
                                                return res.status(400).json({"general" : "Sorry, something went wrong."});
                                            });

                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(400).json({"general" : "Sorry, something went wrong."});
                        });
    }

/**
 * Updates the successor of an item.
 */
exports.assignItem =

    async (req, res) => {

        // iid - item id
        let iid = req.params.iid;
        // uid - user id
        let uid = req.params.uid;

        // a user id of '0' corresponds to a removal of the current successor
        if (uid === '0'){
            return await db
                            .collection('items')
                            .doc(iid)
                            .update({ assignedTo : '' })
                            .then(() => {
                                return res.status(200).json('');
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(400).json({ "msg" : "Sorry, something went wrong." });
                            });
        } else {
            return await db
                            .collection('items')
                            .doc(iid)
                            .get()
                            .then(async itemDoc => {

                                if (!itemDoc.exists){
                                    // invalid iid
                                    return res.status(400).json({ "msg" : "Sorry, something went wrong." });
                                }

                                // validate userID
                                // eslint-disable-next-line promise/no-nesting
                                return await db
                                                .collection('users')
                                                .doc(uid)
                                                .get()
                                                .then(async userDoc => {

                                                    if (!userDoc.exists){
                                                        throw new Error("Invalid user id");
                                                    }

                                                    // set assigned field of item to uid
                                                    try {
                                                        await db
                                                            .collection('items')
                                                            .doc(iid)
                                                            .update({ assignedTo: uid });
                                                        return res.status(200).json(uid);
                                                    }
                                                    catch (err) {
                                                        console.log(err);
                                                        throw new Error(err);
                                                    }
                                                })
                                                .catch (err => {
                                                    // invalid uid
                                                    console.log(err);
                                                    return res.status(400).json({ "msg" : "Please select a user from the list!" });
                                                });

                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(400).json({ "msg" : "Sorry, something went wrong." });
                            });
        }
    }

/*=============================HELPER FUNCTIONS===============================*/

/**
 * Retrieves the secondary users' IDs from the database.
 */
getSecondaryUsers = async () => {
    try {
        const users = await db.collection('users')
                                .get()
                                .then((data) => {
                                    // extract all userIDs
                                    let users = [];
                                    data.forEach((doc) => {
                                        if (parseInt(doc.data()["uType"]) === 1){
                                            users.push(doc.id);
                                        }
                                    });
                                    return users;
                                })
                                .catch((err) => {
                                    throw new Error(err);
                                });
        return users;
    } catch (err) {
        return -1;
    }
}