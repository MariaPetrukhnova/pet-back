const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();


const usersRouter = require("./routes/api/users");
// const achievmentsRouter = require("./routes/api/achievments");
// const activitiesRouter = require("./routes/api/activities");
// const advicesRouter = require("./routes/api/advices");
// const mealsRouter = require("./routes/api/meals");
// const recipesRouter = require("./routes/api/recipes");
// const exercisesRouter = require("./routes/api/exercises");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
// app.use("/api/achievments", achievmentsRouter);
// app.use("/api/activities", activitiesRouter);
// app.use("/api/advices", advicesRouter);
// app.use("/api/meals", mealsRouter)
// app.use("/api/recipes", recipesRouter);
// app.use("/api/exercises", exercisesRouter);


app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({message});
})

module.exports = app;