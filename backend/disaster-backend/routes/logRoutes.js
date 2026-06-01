const express = require("express");
const router = express.Router();
const Log = require("../models/Log");


router.get("/", async (req, res) => {

  try {

    const logs = await Log.find().sort({ date: -1 });

    res.json(logs);

  } catch (err) {

    res.status(500).json({ msg: "Server error" });

  }

});

module.exports = router;