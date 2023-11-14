const {isValidObjectId} = require("mongoose");
const {HttpError} = require("../helpers");

const isValidId = (req, res, next) => {
    const { owner } = req.params;
    if (!isValidObjectId(owner)) {
        next(HttpError(400, `${owner} is not valid id`))
    }
    next();
};

module.exports = isValidId;