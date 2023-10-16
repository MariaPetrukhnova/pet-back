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
            required: [true, "Verified token is required"]
        },
        active: {
            type: Boolean,
            default: false,
        },
        avatarURL: {
            type: String,
            default: "",
        },
        birthDate: {
            type: Date,
            default: new Date(1990, 0, 1, 0, 0, 0, 0),
        },
        height: {
            type: mongoose.Types.Decimal128,
            default: 170,
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
            default: "",
        },
        currentPhoto: [
            {
                photoDate: {
                    type: Date,
                    default: new Date(),
                },
                photoURL: {
                    type: String,
                    default: "",
                },
            }
        ],
        startWeight: {
            type: mongoose.Types.Decimal128,
            default: 60,
        },
        goalWeight: {
            type: mongoose.Types.Decimal128,
            default: 60,
        },
        currentWeight: [
            {
                weightDate: {
                    type: Date,
                    default: new Date(),
                },
                weightPhoto: {
                    type: String,
                    default: "",
                },
            }
        ],
        currentBMI: {
            type: mongoose.Types.Decimal128,
            default: 20.8,
        },
        currentTDEE: {
           kcal: {
                type: mongoose.Types.Decimal128,
                default: 1400,
           },
           protein: {
                type: mongoose.Types.Decimal128,
                default: 70,
           },
           fat: {
                type: mongoose.Types.Decimal128,
                default: 46,
           },
           carbohydrates: {
                type: mongoose.Types.Decimal128,
                default: 175,
           },
           water: {
                type: mongoose.Types.Decimal128,
                default: 1500,
           },
        },
        startDimensions: {
            date: {
                type: Date,
                default: new Date(),
            },
            chest: {
                type: mongoose.Types.Decimal128,
                default: 90,
            },
            waist: {
                type: mongoose.Types.Decimal128,
                default: 60,
            },
            hip: {
                type: mongoose.Types.Decimal128,
                default: 90,
            },
            biceps: {
                type: mongoose.Types.Decimal128,
                default: 32,
            },
            thigh: {
                type: mongoose.Types.Decimal128,
                default: 52,
            },
        },
        currentDimensions: [
            {
                date: {
                    type: Date,
                    default: new Date(),
                },
                chest: {
                    type: mongoose.Types.Decimal128,
                    default: 90,
                },
                waist: {
                    type: mongoose.Types.Decimal128,
                    default: 60,
                },
                hip: {
                    type: mongoose.Types.Decimal128,
                    default: 90,
                },
                biceps: {
                    type: mongoose.Types.Decimal128,
                    default: 32,
                },
                thigh: {
                    type: mongoose.Types.Decimal128,
                    default: 52,
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