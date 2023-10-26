const express = require("express");

const {addAchievements, getAchievements} = require("../../controllers/achievements");
const { validateBody } = require("../../middlewares");
const { checkpointSchema } = require("../../models/achievements");
const updateAchievements = require("../../controllers/achievements/updateAchievements");


const router = express.Router();

router.post("/:owner", validateBody(checkpointSchema), addAchievements);
router.get("/:owner", getAchievements);
router.patch("/:owner", validateBody(checkpointSchema), updateAchievements);

module.exports = router;