const connectDB = require("../config/db");
const Resource = require("../models/Resource");

const seedResources = async () => {
  await connectDB();
  await Resource.deleteMany();

  const locations = [
    { state: "Delhi", city: "New Delhi", landmark: "AIIMS Trauma Centre" },
    { state: "Delhi", city: "Old Delhi", landmark: "Red Fort Response Zone" },
    { state: "Uttar Pradesh", city: "Agra", landmark: "Taj Mahal East Gate" },
    { state: "Uttar Pradesh", city: "Prayagraj", landmark: "Kumbh Mela Area" },
    { state: "Punjab", city: "Amritsar", landmark: "Golden Temple Sector" },
    { state: "Haryana", city: "Gurgaon", landmark: "Cyber City Hub" },
    { state: "Himachal Pradesh", city: "Shimla", landmark: "The Ridge" },
    { state: "Jammu & Kashmir", city: "Srinagar", landmark: "Dal Lake Zone" },
    { state: "Ladakh", city: "Leh", landmark: "Khardung La Pass" },
    { state: "Uttarakhand", city: "Rishikesh", landmark: "Laxman Jhula Sector" },
    { state: "Maharashtra", city: "Mumbai", landmark: "Gateway of India" },
    { state: "Gujarat", city: "Ahmedabad", landmark: "Sabarmati Riverfront" },
    { state: "Rajasthan", city: "Jaipur", landmark: "Hawa Mahal Plaza" },
    { state: "Goa", city: "Panaji", landmark: "Calangute Beach" },
    { state: "Madhya Pradesh", city: "Bhopal", landmark: "Upper Lake Area" },
    { state: "Chhattisgarh", city: "Raipur", landmark: "Naya Raipur Sector" },
    { state: "Karnataka", city: "Bengaluru", landmark: "Vidhana Soudha" },
    { state: "Tamil Nadu", city: "Chennai", landmark: "Marina Beach Relief" },
    { state: "Telangana", city: "Hyderabad", landmark: "Charminar Zone" },
    { state: "Kerala", city: "Kochi", landmark: "Marine Drive" },
    { state: "Andhra Pradesh", city: "Visakhapatnam", landmark: "RK Beach" },
    { state: "West Bengal", city: "Kolkata", landmark: "Victoria Memorial" },
    { state: "Bihar", city: "Patna", landmark: "Gandhi Maidan" },
    { state: "Odisha", city: "Bhubaneswar", landmark: "Puri Beach Sector" },
    { state: "Assam", city: "Guwahati", landmark: "Brahmaputra Bank" },
    { state: "Sikkim", city: "Gangtok", landmark: "MG Marg" },
    { state: "Jharkhand", city: "Ranchi", landmark: "Pundag Hub" },
    { state: "Arunachal Pradesh", city: "Tawang", landmark: "Monastery Sector" },
    { state: "Manipur", city: "Imphal", landmark: "Kangla Fort" },
    { state: "Meghalaya", city: "Shillong", landmark: "Police Bazar" },
    { state: "Mizoram", city: "Aizawl", landmark: "Main City Center" },
    { state: "Nagaland", city: "Kohima", landmark: "Heritage Village" },
    { state: "Tripura", city: "Agartala", landmark: "Palace Zone" }
  ];

  const templates = [
    { name: "Ambulance", priority: "high", total: 15 },
    { name: "Fire Truck", priority: "high", total: 8 },
    { name: "Rescue Team", priority: "critical", total: 10 },
    { name: "Medical Kits", priority: "medium", total: 100 }
  ];

  const finalResources = [];
  locations.forEach(loc => {
    templates.forEach(temp => {
      finalResources.push({
        name: `${loc.state} ${temp.name}`,
        priority: temp.priority,
        total: temp.total,
        used: 0,
        assignedTo: loc.landmark, // Initially at base
        landmark: loc.landmark,   // Permanent memory
        state: loc.state,
        city: loc.city,
        availability: "24x7"
      });
    });
  });

  await Resource.insertMany(finalResources);
  console.log("✅ 132 Resources seeded successfully including Delhi!");
  process.exit();
};
seedResources();