const express = require("express");

const { register, login, logout, updateAvatar, getCurrent } = require("../../controllers/users");
const { validateBody, upload, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegistrationSchema), register);

router.post("/login", validateBody(schemas.userLoginSchema), login);

router.post("/logout", authentificate, logout);

router.get("/current", authentificate, getCurrent);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;