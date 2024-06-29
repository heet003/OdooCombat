// BookSlot.jsx
import React, { useState } from "react";
import "./BookForm.css"; // Make sure to create a BookSlot.css file for styling

const BookForm = () => {
  const [formData, setFormData] = useState({
    userType: "",
    eWasteCategory: "",
    quantity: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic
  };

  return (
    <div className="book-slot">
      <h2>Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eWasteCategory">Category of E-Waste</label>
          <select
            id="eWasteCategory"
            name="eWasteCategory"
            value={formData.eWasteCategory}
            onChange={handleChange}
            required
          >
           <option value="">Select</option>
    <option value="Large Household Appliances">Large Household Appliances (e.g., Refrigerators, Washing Machines)</option>
    <option value="Small Household Appliances">Small Household Appliances (e.g., Toasters, Hair Dryers)</option>
    <option value="IT and Telecommunications Equipment">IT and Telecommunications Equipment (e.g., Computers, Phones)</option>
    <option value="Consumer Electronics">Consumer Electronics (e.g., TVs, Audio Equipment)</option>
    <option value="Lighting Equipment">Lighting Equipment (e.g., Lamps, LED Bulbs)</option>
    <option value="Electrical and Electronic Tools">Electrical and Electronic Tools (e.g., Drills, Saws)</option>
    <option value="Toys, Leisure, and Sports Equipment">Toys, Leisure, and Sports Equipment (e.g., Electric Toys, Fitness Equipment)</option>
    <option value="Medical Devices">Medical Devices (e.g., Thermometers, Blood Pressure Monitors)</option>
    <option value="Monitoring and Control Instruments">Monitoring and Control Instruments (e.g., Smoke Detectors, Thermostats)</option>
    <option value="Batteries and Accumulators">Batteries and Accumulators (e.g., Rechargeable Batteries, Car Batteries)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity of E-Waste</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date and Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
