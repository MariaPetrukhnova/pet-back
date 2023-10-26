const { Achievements } = require("../../models/achievements");
const { checkpointSchema } = require("../../models/achievements");
const { HttpError } = require("../../helpers");

const addAchievements = async (req, res) => {
    const { error } = checkpointSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { owner } = req.params;
    let achievments = {};

    const achievementsCard = await Achievements.findOne({ owner });

    const updateData = {}

    updateData.$push = { checkpoints: req.body }

    if (achievementsCard) {
        achievments = await Achievements.findByIdAndUpdate(
            achievementsCard._id,
            updateData,
            {new: true, safe: true, upsert: true}
        );
    };
    
    if (!achievementsCard) {
        achievments = await Achievements.create(
            {
                checkpoints: req.body,
                owner: owner,
            }
        );
    };

    if (!achievments) {
        throw HttpError(404, "Not found");
    }

    res.status(201).json(achievments);
}

module.exports = addAchievements;

