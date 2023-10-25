const express = require("express");

const {addAchievements} = require("../../controllers/achievements");
const { validateBody } = require("../../middlewares");
const { checkpointSchema } = require("../../models/achievements2");


const router = express.Router();

router.post("/:owner", validateBody(checkpointSchema), addAchievements);

module.exports = router;