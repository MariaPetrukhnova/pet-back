const fs = require("fs/promises");
const path = require("path");

const advicePath = path.join(__dirname, "adviceDB.json");

const listAdvice = async () => {
    const data = await fs.readFile(advicePath);
    return JSON.parse(data);
}

const getAdvice = async (req, res) => {
    const event = req.body;
    const advice = await listAdvice();
    const result = advice.find((item) => {
        item.event === event.event;
        if (item.event === event.event) {
            return item;
        }
    });

    res.json(result.message);
}

module.exports = getAdvice;