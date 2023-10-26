const {checkpointSchema, Achievements} = require("../../models/achievements");
const {HttpError} = require("../../helpers")

const updateAchievements = async (req, res) =>{
    const { error } = checkpointSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    };

    const {owner} = req.params;

    const userAchievements = await Achievements.findOne({owner});

    const toBeUpdated = userAchievements.checkpoints.find(({ date }) => date.toLocaleDateString() === req.body.date.toLocaleDateString());
    console.log(toBeUpdated);

    const updatedAchievements = await userAchievements.updateOne(
        {
            "checkpoints": { "$elemMatch": { "date": req.body.date }}
        },
        {
            "$set": { "chekpotnts": req.body }
        }
    );

    if (!userAchievements) {
        return
    }

    res.status(200).json({
        timelySupper: updatedAchievements.timelySupper,
        dailyKcal: updatedAchievements.dailyKcal,
        dailySteps: updatedAchievements.dailySteps,
        dailyExercises: updatedAchievements.dailyExercises,
        healthySleep: updatedAchievements.healthySleep,
        waterIntake: updatedAchievements.waterIntake,
        activeTraining: updatedAchievements.activeTraining,
        skinTreatment: updatedAchievements.skinTreatment,
        noSweets: updatedAchievements.noSweets,
        dailyPFC: updatedAchievements.dailyPFC,
        alcoDay: updatedAchievements.alcoDay,
        cheetMeal: updatedAchievements.cheetMeal,
        hypodinamia: updatedAchievements.hypodinamia,
        nightMeal: updatedAchievements.nightMeal,
    })
};



module.exports = updateAchievements