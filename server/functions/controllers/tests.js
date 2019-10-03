const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { admin, db } = require("../util/admin");
const config = require("../util/config");
var multiparty = require('multiparty');

exports.uploadImg =

    (req, res) => {

        const busboy = new BusBoy({ headers: req.headers });

        let imageToBeUploaded = {};
        let imageFileName;

        // add the textual data
        db
            .collection('items')
            .add({
                name: req.body.name,
                desc: req.body.desc
            })
            .then(ref => {
                console.log('Added document with ID: ', ref.id);
                return
            })
            .catch(err => {
                res.status(500).json({ err: err });
            })

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log(fieldname, file, filename, encoding, mimetype);
            if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Wrong file type submitted' });
            }
            // my.image.png => ['my', 'image', 'png']
            const imageExtension = filename.split('.')[filename.split('.').length - 1];
            // 32756238461724837.png
            // imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;
            imageFileName = filename;
            const filepath = path.join(os.tmpdir(), imageFileName);
            imageToBeUploaded = { filepath, mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });
        busboy.on('finish', () => {
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
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                // return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
                return res.json({ message: 'image uploaded successfully' });
            })
            // .then(() => {
            //     return res.json({ message: 'image uploaded successfully' });
            // })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: 'something went wrong' });
            });
        });
        busboy.end(req.rawBody);
    };