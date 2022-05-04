const multer = require('multer')
exports.errHandling = async (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send(err.message);
    } else if (err) {
        return res.status(500).send(err.message);
    }
}
