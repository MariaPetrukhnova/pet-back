const {Schema, model, default: mongoose} = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const {emailRegexp} = require("../constants/user");

const userSchema = new Schema(
    {
        login: {
            type: String,
            required: [true, "Login is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password id required"]
        },
        email: {
            type: String,
            match: emailRegexp,
            required: [true, "Email is required"],
            unique: true,
        },
        token: {
            type: String,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verifiedToken: {
            type: String,
        },
        active: {
            type: Boolean,
            default: false,
        },
        avatarURL: {
            type: String,
        },
        birthDate: {
            type: Date,
        },
        height: {
            type: mongoose.Types.Decimal128,
        },
        goal: {
            type: String,
            enum: [
                "To lose weight",
                "To maintain weight",
                "To gain weight",
                "To cut my body",
                "To bulk my body",
            ],
            required: [true, "Set your goal"]
        },
        startPhoto: {
            type: String,
        },
        currentPhoto: [
            {
                photoDate: {
                    type: Date,
                },
                photoURL: {
                    type: String,
                },
            }
        ],
        startWeight: {
            type: mongoose.Types.Decimal128,
        },
        goalWeight: {
            type: mongoose.Types.Decimal128,
        },
        currentWeight: [
            {
                weightDate: {
                    type: Date,
                },
                weightPhoto: {
                    type: String,
                },
            }
        ],
        currentBMI: {
            type: mongoose.Types.Decimal128,
        },
        currentTDEE: {
           kcal: {
                type: mongoose.Types.Decimal128,
           },
           protein: {
                type: mongoose.Types.Decimal128,
           },
           fat: {
                type: mongoose.Types.Decimal128,
           },
           carbohydrates: {
                type: mongoose.Types.Decimal128,
           },
           water: {
                type: mongoose.Types.Decimal128,
           },
        },
        startDimensions: {
            date: {
                type: Date,
            },
            chest: {
                type: mongoose.Types.Decimal128,
            },
            waist: {
                type: mongoose.Types.Decimal128,
            },
            hip: {
                type: mongoose.Types.Decimal128,
            },
            biceps: {
                type: mongoose.Types.Decimal128,
            },
            thigh: {
                type: mongoose.Types.Decimal128,
            },
        },
        currentDimensions: [
            {
                date: {
                    type: Date,
                },
                chest: {
                    type: mongoose.Types.Decimal128,
                },
                waist: {
                    type: mongoose.Types.Decimal128,
                },
                hip: {
                    type: mongoose.Types.Decimal128,
                },
                biceps: {
                    type: mongoose.Types.Decimal128,
                },
                thigh: {
                    type: mongoose.Types.Decimal128,
                },
            },
        ],
        friends: {
            type: Array,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const userRegistrationSchema = Joi.object({
    login: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).max(30).required(),
    goal: Joi.string().required(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).max(30).required(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});


const schemas = {
    userRegistrationSchema,
    userLoginSchema,
    verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
    schemas,
    User,
}