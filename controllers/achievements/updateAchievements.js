const {checkpointSchema, Achievements} = require("../../models/achievements");
const {HttpError} = require("../../helpers");

const updateAchievements = async (req, res) =>{
    const { error } = checkpointSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    };

    const {owner} = req.params;

    const userAchievements = await Achievements.findOne({owner});


    try {
        const updatedCheckpoints = await Achievements.findOneAndUpdate(
            {owner},
            { $set: { "checkpoints.$[elem]": req.body } },
            { arrayFilters:[ { "elem.date": { $eq: req.body.date } } ], returnDocument: 'after' },
    );
    

        res.status(200).json({
            updatedCheckpoints
        })

    } catch(err) {
    console.log(err);
    res.statusSend(500);
}
};



module.exports = updateAchievements