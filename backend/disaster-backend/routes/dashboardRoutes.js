const express = require("express");
const router = express.Router();

const Disaster = require("../models/Disaster");

router.get("/", async (req, res) => {

  try {

    const disasters = await Disaster.find();

    const total = disasters.length;

    const active = disasters.filter(
      d => d.status !== "Resolved"
    ).length;

    const resolved = disasters.filter(
      d => d.status === "Resolved"
    ).length;

    res.json({
      total,
      active,
      resolved,
      resourcesUsed: disasters.length,
      disasters
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;