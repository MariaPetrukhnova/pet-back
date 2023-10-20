const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const updateUserInfo = require("./updateUserInfo");
const addBodyMeasurements = require("./addBodyMeasurements");
const getUserInfo = require("./getUserInfo");

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    updateUserInfo: ctrlWrapper(updateUserInfo),
    addBodyMeasurements: ctrlWrapper(addBodyMeasurements),
    getUserInfo: ctrlWrapper(getUserInfo),
}