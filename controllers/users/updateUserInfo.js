const { User, schemas } = require("../../models/user");
const { HttpError } = require("../../helpers");


const updateUserInfo = async (req, res) => {
    const { error } = schemas.userCardSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json({
        login: result.login,
        avatarURL: result.avatarURL, 
        startPhoto: result.startPhoto,
        goal: result.goal,
        birthDate: result.birthDate,
        height: result.height,
        startWeight: result.startWeight,
        goalWeight: result.goalWeight,
        startDimensions: result.startDimensions
    })
};

module.exports = updateUserInfo;