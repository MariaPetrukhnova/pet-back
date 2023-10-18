const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUserInfo = async (req, res) => {
    const id = req.user._id;
    if (!id) {
        throw HttpError(404, "User is not found");
    }
    await User.findOneAndUpdate(id, req.body);
    const updateUserObj = await User.findById(id);
    res.status(200).json({
        login: updateUserObj.login,
        avatarURL: updateUserObj.avatarURL,
        startPhoto: updateUserObj.startPhoto,
        goal: updateUserObj.goal, 
        birthDate: updateUserObj.birthDate, 
        height: updateUserObj.height, 
        startWeight: updateUserObj.startWeight, 
        goalWeight: updateUserObj.goalWeight, 
        startDimensions: updateUserObj.startDimensions,     
    })
};

module.exports = updateUserInfo;