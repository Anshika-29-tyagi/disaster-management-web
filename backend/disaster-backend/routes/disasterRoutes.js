const express = require("express");
const router = express.Router();

const Disaster = require("../models/Disaster");

router.post("/", async (req, res) => {

  try {

    const disaster = new Disaster(req.body);

    await disaster.save();

    res.status(201).json({
      message: "Disaster saved"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});
router.put("/:id", async (req, res) => {

  try {

    const disaster = await Disaster.findById(req.params.id);

    if (!disaster) {
      return res.status(404).json({
        message: "Disaster not found"
      });
    }

    if (disaster.status === "Reported") {
      disaster.status = "In Progress";
    }
    else if (disaster.status === "In Progress") {
      disaster.status = "Resolved";
    }

    await disaster.save();

    res.json({
      message: "Status updated",
      disaster
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});
module.exports = router;