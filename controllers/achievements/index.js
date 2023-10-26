const { ctrlWrapper } = require("../../helpers");

const addAchievements = require("./addAchievements");
const getAchievements = require("./getAchievements");

module.exports = {
    addAchievements: ctrlWrapper(addAchievements),
    getAchievements: ctrlWrapper(getAchievements),
}