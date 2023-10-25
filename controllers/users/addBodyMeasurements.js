const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");



const addBodyMeasurements = async (req, res) => {
  const { id } = req.params;
  const { photoURL, weight, chest, waist, hip, biceps, thigh } = req.body;

  const updateData = {}

  if (photoURL) {
    updateData.$push = { currentPhoto: { photoURL } }
  }

  if (weight) {
    updateData.$push = { currentWeight: { weight } }
  }

  if (chest || waist || hip || biceps || thigh) {
    updateData.$push = { currentDimensions: { chest, waist, hip, biceps, thigh } }
  }

  try {
    const updateUserMeasurements = await User.findByIdAndUpdate(
      id,
      updateData,
      {new: true, safe: true, upsert: true}
    );

    if (!updateUserMeasurements) {
      throw HttpError(404, "Not found");
  }

    res.status(200).json({
      currentDimensions: updateUserMeasurements.currentDimensions,
      currentPhoto: updateUserMeasurements.currentPhoto,
      currentWeight: updateUserMeasurements.currentWeight,
    });
  } catch(err) {
    console.log(err)
    res.statusSend(500)
  }
  
}

module.exports = addBodyMeasurements;

