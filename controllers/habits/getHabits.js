const { Habits } = require("../../models/habits");
const {HttpError} = require("../../helpers");


const getHabits = async (req, res) => {
    const { owner } = req.params;
    const userHabits = await Habits.findOne({owner});
    const currentDate = req.body.date;

    if(!userHabits) {
        throw HttpError (
            404, "This user doesn't set any habits yet"
        )
    }

    const userHabitsArr = await userHabits.habits;
    const currentHabitsArr = userHabitsArr.find(({ date }) => date === currentDate);


    res.json(currentHabitsArr.toDoList);
};

module.exports = getHabits;