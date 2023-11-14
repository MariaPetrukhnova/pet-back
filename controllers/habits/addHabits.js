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
    const currentDate = new Date().toDateString();

    const userHabits = await Habits.findOne({owner});

    const updateData = {};
    // const newToDos = {};

    // newToDos.$push = {toDoList: req.body};
    // console.log(newToDos);
    updateData.$push = {habits: {date: currentDate, toDoList: req.body}};
    console.log(updateData)

    if (userHabits) {
        toDos = await Habits.findByIdAndUpdate(
            userHabits._id,
            updateData,
            {new: true, safe: true, upsert: true}
        );
    };

    if (!userHabits) {
        toDos = await Habits.create({
            habits: updateData,
            owner: owner,
        });
    };

    if (!toDos) {
        throw HttpError(404, "Not found");
    };

    res.status(201).json(toDos);

};

module.exports = addHabits;
