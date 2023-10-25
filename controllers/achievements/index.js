const { ctrlWrapper } = require("../../helpers");

const addAchievements = require("./addAchievements2");

module.exports = {
    addAchievements: ctrlWrapper(addAchievements),
}