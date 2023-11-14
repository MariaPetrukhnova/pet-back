const { ctrlWrapper } = require("../../helpers");

const getAdvice = require("./getAdvice");

module.exports = {
    getAdvice: ctrlWrapper(getAdvice)
}