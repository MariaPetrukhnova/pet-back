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
    console.log(req.body);
    const currentDate = new Date().toDateString();

    const userHabits = await Habits.findOne({owner});
    // const userHabitsByDate = userHabits?.habits.find((item) => item.date === currentDate);

    const updateData = {
        date: currentDate,
        toDoList: req.body
    };

    if (!userHabits) {
        const habit = new Habits({
            owner,
            habits: updateData
        })
        toDos = await habit.save();
    };

    if (userHabits) {
        toDos = await Habits.findByIdAndUpdate(
            userHabits._id,
            {
                habits: updateData
            },
            { returnDocument: 'after' }
        );
    };

    if (!toDos) {
        throw HttpError(404, "Not found");
    };

    res.status(201).json(toDos);

};

module.exports = addHabits;
