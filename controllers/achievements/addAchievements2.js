const { Achievements } = require("../../models/achievements2");
const { checkpointSchema } = require("../../models/achievements2");
const { HttpError } = require("../../helpers");

const addAchievements = async (req, res) => {
    const { error } = checkpointSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { owner } = req.params;
    let achievments = {};
    let checkpoints = {};

    if (req.body) {
      checkpoints.$push = { ...req.body }
    };

    const achievementsCard = await Achievements.findOne({ owner });

    if (achievementsCard) {
        achievments = await Achievements.findByIdAndUpdate(
            achievementsCard._id,
            checkpoints,
            {new: true, safe: true, upsert: true}
        );
    }
    
    achievments = await Achievements.create(
        {
            checkpoints: req.body,
            owner: owner,
        }
    );
    if (!achievments) {
        throw HttpError(404, "Not found");
    }

    res.status(201).json(achievments);
}

module.exports = addAchievements;

