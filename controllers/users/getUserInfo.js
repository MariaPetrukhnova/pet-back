const { User } = require("../../models/user");

const getUserInfo = async (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);

    res.json({
        login: result.login,
        avatarURL: result.avatarURL, 
        startPhoto: result.startPhoto,
        goal: result.goal,
        birthDate: result.birthDate,
        height: result.startPhoto,
        startWeight: result.startWeight,
        goalWeight: result.goalWeight,
        startDimensions: result.startDimensions,
        currentPhoto: result.currentPhoto,
        currentWeight: result.currentWeight, 
        currentDimensions: result.currentDimensions,
    });
};

module.exports = getUserInfo;
