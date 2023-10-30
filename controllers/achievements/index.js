const { ctrlWrapper } = require("../../helpers");

const addAchievements = require("./addAchievements");
const getAchievements = require("./getAchievements");
const updateAchievements = require("./updateAchievements");

module.exports = {
    addAchievements: ctrlWrapper(addAchievements),
    getAchievements: ctrlWrapper(getAchievements),
    updateAchievements: ctrlWrapper(updateAchievements)
}