const {Achievements} = require("../../models/achievements");
const {HttpError} = require("../../helpers");

const getAchievements = async (req, res) => {
    const { owner } = req.params;
    const userAchievements = await Achievements.findOne({owner});

    if(!userAchievements) {
        throw HttpError (
            404, "This user doesn't have any achievements"
        )
    }

    res.json(userAchievements);
};

module.exports = getAchievements;