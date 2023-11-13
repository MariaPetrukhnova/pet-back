const express = require("express");

const {addHabits, getHabits, updateHabits} = require("../../controllers/habits");
const { validateBody, isValidId } = require("../../middlewares");
const { toDoListSchema } = require("../../models/habits");


const router = express.Router();

router.post("/:owner", isValidId, validateBody(toDoListSchema), addHabits);
router.get("/:owner", isValidId,  getHabits);
router.patch("/:owner", isValidId, validateBody(toDoListSchema), updateHabits);

module.exports = router;