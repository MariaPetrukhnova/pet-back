const express = require("express");

const {addAchievements, getAchievements, updateAchievements} = require("../../controllers/achievements");
const { validateBody, isValidId } = require("../../middlewares");
const { checkpointSchema } = require("../../models/achievements");



const router = express.Router();

router.post("/:owner", isValidId, validateBody(checkpointSchema), addAchievements);
router.get("/:owner", isValidId, getAchievements);
router.patch("/:owner", isValidId, validateBody(checkpointSchema), updateAchievements);

module.exports = router;