const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const sendEmail = require("../../helpers");
const nanoid = require("nanoid");

const {BASE_URL} = process.env;

const resendVerifyEmail = async (req,res) => {
    const { email } = req.body;
    const user = await User.findOne({email});

    if(!email) {
        throw HttpError(400, "Missing required field email");
    }

    if(!user) {
        throw HttpError(404, "Email is not found");
    }

    if(user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifiedToken = nanoid();
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${verifiedToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification successful"
    })

}

module.exports = resendVerifyEmail;