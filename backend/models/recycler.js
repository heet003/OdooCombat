const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for e-waste recycler
const recycler = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  acceptedEWaste: { type: [String], required: true },
  serviceAreas: { type: [String], required: true },
  testimonials: { type: [] },
  customerRating: { type: Number },
  pricingPerKg: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

// Create model from schema
module.exports = mongoose.model("Recycler", recycler);
