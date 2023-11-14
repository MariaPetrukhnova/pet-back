const express = require("express");

const {getAdvice} = require("../../controllers/advice");

const router = express.Router();

router.get("/", getAdvice);

module.exports = router;