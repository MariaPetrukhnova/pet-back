const { Achievements } = require("../../models/achievements");
const { checkpointSchema } = require("../../models/achievements");
const { HttpError } = require("../../helpers");

const addAchievements = async (req, res) => {
    const { error } = checkpointSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { owner } = req.params;
    
    const checkpoints = await Achievements.create(
        {
            checkpoints: req.body,
            owner: owner
        }
    );
    if (!checkpoints) {
        throw HttpError(404, "Not found");
    }

    res.status(201).json(checkpoints);
}

module.exports = addAchievements;

