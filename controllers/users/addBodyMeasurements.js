const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const addBodyMeasurements = async (req, res) => {
    const id = req.user._id;
    if (!id) {
        throw HttpError(404, "User is not found");
    }
    await User.findOneAndUpdate(id, req.body);
    const updateUserMeasurements = await User.findById(id);
    res.status(200).json({
        currentPhoto: [...updateUserMeasurements.currentPhoto],
        currentWeight: [...updateUserMeasurements.currentWeight], 
        currentDimensions: [...updateUserMeasurements.currentDimensions]
    })
};

module.exports = addBodyMeasurements;