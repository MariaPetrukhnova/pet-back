const {toDoListSchema, Habits} = require("../../models/habits");
const { HttpError } = require("../../helpers");

const updateHabits = async (req, res) => {
    const { error } = toDoListSchema.validate(req.body);
    if (error) {
        throw HttpError(400, "missing fields");
    };

    const {owner} = req.params;

    const userHabits = await Habits.findOne({owner});

    
    try {
        const updatedToDos = await Habits.findOneAndUpdate(
            {owner},
            { $set: { "habits.$[elem]": req.body } },
            { arrayFilters:[ { "elem.date": { $eq: req.body.date } } ]},
            { returnNewDocument: true }
    );
    

        res.status(200).json({
            updatedToDos
        })

    } catch(err) {
    console.log(err);
    res.statusSend(500);
}
};


module.exports = updateHabits;