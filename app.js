const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();


const usersRouter = require("./routes/api/users");
const achievementsRouter = require("./routes/api/achievements");
// const activitiesRouter = require("./routes/api/activities");
const adviceRouter = require("./routes/api/advice");
// const mealsRouter = require("./routes/api/meals");
// const recipesRouter = require("./routes/api/recipes");
const habitsRouter = require("./routes/api/habits");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/achievements", achievementsRouter);
// app.use("/api/activities", activitiesRouter);
app.use("/api/advice", adviceRouter);
// app.use("/api/meals", mealsRouter)
// app.use("/api/recipes", recipesRouter);
app.use("/api/habits", habitsRouter);


app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({message});
})

module.exports = app;