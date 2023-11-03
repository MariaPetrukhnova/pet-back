const express = require("express");

const {addHabits, getHabits, deleteHabits, updateHabits} = require("../../controllers/habits");
const { validateBody } = require("../../middlewares");
const { toDoListSchema } = require("../../models/habits");



const router = express.Router();

// router.post("/:owner", validateBody(toDoListSchema), addAchievements);
router.get("/:owner", getHabits);
// router.patch("/:owner", validateBody(toDoListSchema), updateAchievements);

module.exports = router;