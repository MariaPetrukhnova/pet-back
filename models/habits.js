const { Schema, model, default: mongoose } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const currentDate = new Date();

const TodosSchema = new Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    done: {
        type: Boolean,
    }
})

const habitsSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        habits: [
            {
                date: {
                    type: Date,
                    default: currentDate.toDateString(),
                },
                toDoList: [TodosSchema]
            }
        ]
    },
    { versionKey: false, timestamps: true }
);

habitsSchema.post("save", handleMongooseError);

const toDoListSchema = Joi.array().items({
    title: Joi.string(),
    text: Joi.string(),
    done: Joi.boolean(),
});

const Habits = model("habit", habitsSchema);

module.exports = {
    toDoListSchema,
    Habits,
}
