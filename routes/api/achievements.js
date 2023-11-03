const express = require("express");

const {addAchievements, getAchievements, updateAchievements} = require("../../controllers/achievements");
const { validateBody } = require("../../middlewares");
const { checkpointSchema } = require("../../models/achievements");



const router = express.Router();

router.post("/:owner", validateBody(checkpointSchema), addAchievements);
router.get("/:owner", getAchievements);
router.patch("/:owner", validateBody(checkpointSchema), updateAchievements);

module.exports = router;