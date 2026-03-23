const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const Log = require("../models/Log");

// GET all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ASSIGN: Sets status to Disaster Site
router.put("/:id/assign", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: "Not found" });

    if (resource.used < resource.total) {
      resource.used += 1;
      resource.assignedTo = "Disaster Site"; // Change display
      resource.utilization = Math.round((resource.used / resource.total) * 100);
      await resource.save();

      await Log.create({
        action: "ASSIGN",
        resource: resource.name,
        date: new Date()
      });
    }
    res.json(resource);
  } catch (err) { res.status(500).json(err); }
});

// RELEASE: Returns display to original Landmark
router.put("/:id/release", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: "Not found" });

    if (resource.used > 0) {
      resource.used -= 1;
      resource.utilization = Math.round((resource.used / resource.total) * 100);
      
      // If all units returned, show original landmark
      if (resource.used === 0) {
        resource.assignedTo = resource.landmark;
      }
      
      await resource.save();
      await Log.create({
        action: "RELEASE",
        resource: resource.name,
        date: new Date()
      });
    }
    res.json(resource);
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;