const Resource = require("../models/Resource");
const Log = require("../models/Log");

// Assign Resource
exports.assignResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Not found" });

    // Logical Check: Don't assign more than you have
    if (resource.used < resource.total) {
      resource.used += 1;
      resource.utilization = Math.round((resource.used / resource.total) * 100);
      await resource.save();

      await Log.create({
        action: "ASSIGN",
        resource: resource.name || resource.title,
        performedBy: "Admin",
        remarks: `${resource.name || resource.title} dispatched to site`,
        date: new Date()
      });
    }
    res.json(resource);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Release Resource
exports.releaseResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Not found" });

    if (resource.used > 0) {
      resource.used -= 1;
      resource.utilization = Math.round((resource.used / resource.total) * 100);
      await resource.save();

   // Inside exports.releaseResource:
// Inside releaseResource
await Log.create({
  action: "RELEASE",
  resource: resource.name || resource.title, // Support both fields
  performedBy: "Admin",
  remarks: `${resource.name || resource.title} released to standby`, 
  date: new Date()
});
    }
    res.json(resource);
  } catch (err) { res.status(500).json({ message: err.message }); }
};