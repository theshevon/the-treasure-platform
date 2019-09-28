exports.showError =
    (req, res) => {
        res.status(404).json({ msg: "Sorry, this page does not exist"});
    }
