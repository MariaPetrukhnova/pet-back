const express = require("express");

const { register, login, logout, updateAvatar, getCurrent, verifyEmail, resendVerifyEmail, addBodyMeasurements, updateUserInfo, getUserInfo } = require("../../controllers/users");
const { validateBody, upload, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegistrationSchema), register);

router.get("/verify/:verifiedToken", verifyEmail);

router.post("/verify", validateBody(schemas.verifyEmailSchema), resendVerifyEmail)

router.post("/login", validateBody(schemas.userLoginSchema), login);

router.post("/logout", authentificate, logout);

router.get("/current", authentificate, getCurrent);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

router.get("/usercard/:id", authentificate, getUserInfo);

router.patch("/usercard/:id", validateBody(schemas.userCardSchema), updateUserInfo);

router.patch("/measurements/:id", /*validateBody(schemas.userMeasurementsSchema),*/ addBodyMeasurements);

module.exports = router;