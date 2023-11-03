const { ctrlWrapper } = require("../../helpers");

const addHabits = require("./addHabits");
const getHabits = require("./getHabits");
const updateHabits = require("./updateHabits");
const deleteHabits = require("./deleteHabits")

module.exports = {
    addHabits: ctrlWrapper(addHabits),
    getHabits: ctrlWrapper(getHabits),
    updateHabits: ctrlWrapper(updateHabits),
    deleteHabits: ctrlWrapper(deleteHabits)
}