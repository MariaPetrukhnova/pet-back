const { User, schemas } = require("../../models/user");
const { HttpError } = require("../../helpers");

const addBodyMeasurements = async (req, res) => {
    const { error } = schemas.userMeasurementsSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    }
    const updateUserMeasurements = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!updateUserMeasurements) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({
        currentPhoto: [...updateUserMeasurements.currentPhoto],
        currentWeight: [...updateUserMeasurements.currentWeight], 
        currentDimensions: [...updateUserMeasurements.currentDimensions]
    })
};

module.exports = addBodyMeasurements;

