const { Habits } = require("../../models/habits");
const {HttpError} = require("../../helpers");
const {toDoListSchema} = require("../../models/habits");


const addHabits = async (req, res) => {
    const { error } = toDoListSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    };

    const { owner } = req.params;
    let toDos = {};

    const userHabits = await Habits.findOne({owner});

    const updateData = {};

    updateData.$push = {habits: req.body};

    if (userHabits) {
        toDos = await Habits.findByIdAndUpdate(
            userHabits._id,
            updateData,
            {new: true, safe: true, upsert: true}
        );
    };

    if (!userHabits) {
        toDos = await Habits.create({
            habits: req.body,
            owner: owner,
        });
    };

    if (!toDos) {
        throw HttpError(404, "Not found");
    };

    res.status(201).json(toDos);

};

module.exports = addHabits;
