const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true, unique: true },
    address: {
      type: String,
      required: true,
    },
    bookings: [{ type: mongoose.Types.ObjectId, required: true, ref: "Booking" }],
    eWastePreferences: {
      type: [String],
      enum: [
        "Large Household Appliances (e.g., Refrigerators)",
        "Small Household Appliances (e.g., Toasters)",
        "IT and Telecommunications Equipment (e.g., Computers)",
        "Consumer Electronics (e.g., TVs)",
        "Lighting Equipment (e.g., Lamps)",
        "Electrical and Electronic Tools (e.g., Drills)",
        "Toys, Leisure, and Sports Equipment (e.g., Electronic Toys)",
        "Medical Devices (e.g., Monitors)",
        "Monitoring and Control Instruments (e.g., Thermostats)",
        "Batteries and Accumulators",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
