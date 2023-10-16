const { HttpError } = require("../../helpers");
const { User } = require("../../models/user")


const verifyEmail = async (req, res) => {
    const { verifiedToken } = req.params;
    const user = await User.findOne({ verifiedToken });
    if (!user) {
        throw HttpError(404, "User is not found");
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verifiedToken: null});

    res.status(200).json({
        message: "Verification is successful"
    })
}

module.exports = verifyEmail;