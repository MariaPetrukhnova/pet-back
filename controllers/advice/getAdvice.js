const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const advicePath = path.join(__dirname, "adviceDB.json");

const listAdvice = async () => {
    const data = await fs.readFile(advicePath);
    return JSON.parse(data);
}

const getAdvice = async (req, res) => {
    const event = req.body;
    const advice = await listAdvice();
    const result = advice.find(item => item.event === event);
    return result || null;
}

module.exports = getAdvice;