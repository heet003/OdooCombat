const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  eWasteCategory: { type: String, required: true },
  quantity: { type: Number, required: true },
  userType: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Booking", bookingSchema);
