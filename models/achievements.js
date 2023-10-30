const { Schema, model, default: mongoose } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const currentDate = new Date();

const achievementShema = new Schema(  
        {
            owner: {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            checkpoints: 
            [
                {
                    date: {
                        type: Date,
                        default: currentDate.toDateString(),
                    },
                    timelySupper: {
                        type: Boolean,
                        default: false,
                    },
                    dailyKcal: {
                        type: Boolean,
                        default: false,
                    },
                    dailySteps: {
                        type: Boolean,
                        default: false,
                    },
                    dailyExercises: {
                        type: Boolean,
                        default: false,
                    },
                    healthySleep: {
                        type: Boolean,
                        default: false,
                    },
                    waterIntake: {
                        type: Boolean,
                        default: false,
                    },
                    activeTraining: {
                        type: Boolean,
                        default: false,
                    },
                    skinTreatment: {
                        type: Boolean,
                        default: false,
                    },
                    noSweets: {
                        type: Boolean,
                        default: false,
                    },
                    dailyPFC: {
                        type: Boolean,
                        default: false,
                    },
                    alcoDay: {
                        type: Boolean,
                        default: false,
                    },
                    cheetMeal: {
                        type: Boolean,
                        default: false,
                    },
                    hypodinamia: {
                        type: Boolean,
                        default: false,
                    },
                    nightMeal: {
                        type: Boolean,
                        default: false,
                    },
                }
            ]
        },
    { versionKey: false, timestamps: true }
);

achievementShema.post("save", handleMongooseError);

const checkpointSchema = Joi.object({
    date: Joi.date(),
    timelySupper: Joi.boolean().required(),
    dailyKcal: Joi.boolean().required(),
    dailySteps: Joi.boolean().required(),
    dailyExercises: Joi.boolean().required(),
    healthySleep: Joi.boolean().required(),
    waterIntake:  Joi.boolean(),
    activeTraining: Joi.boolean(),
    skinTreatment: Joi.boolean(),
    noSweets: Joi.boolean(),
    dailyPFC: Joi.boolean(),
    alcoDay: Joi.boolean(),
    cheetMeal: Joi.boolean(),
    hypodinamia: Joi.boolean(),
    nightMeal: Joi.boolean(),
});

const Achievements = model("achievment", achievementShema);

module.exports = {
    checkpointSchema,
    Achievements,
}

