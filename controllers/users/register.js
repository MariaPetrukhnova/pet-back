const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const {BASE_URL} = process.env;

const register = async (req, res) => {
    const { login, email, password, goal } = req.body;

    console.log(req.body)
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError (409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verifiedToken = nanoid();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verifiedToken,
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${verifiedToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        login: newUser.login,
        email:newUser.email,
        goal:newUser.goal,
        message:"Verification successful",
    })
};

module.exports = register;