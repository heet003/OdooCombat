// BookSlot.jsx
import React, { useState } from "react";
import "./BookForm.css"; // Make sure to create a BookSlot.css file for styling
import { useAuth } from "../hooks/auth-hook";
import ErrorModal from "../Shared/UIElements/ErrorModal";
import LoadingSpinner from "../Shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.userType = role;
    try {
      await sendRequest(
        "http://localhost:5000/api/users/book-slot",
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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
              <option value="Large Household Appliances">
                Large Household Appliances (e.g., Refrigerators, Washing
                Machines)
              </option>
              <option value="Small Household Appliances">
                Small Household Appliances (e.g., Toasters, Hair Dryers)
              </option>
              <option value="IT and Telecommunications Equipment">
                IT and Telecommunications Equipment (e.g., Computers, Phones)
              </option>
              <option value="Consumer Electronics">
                Consumer Electronics (e.g., TVs, Audio Equipment)
              </option>
              <option value="Lighting Equipment">
                Lighting Equipment (e.g., Lamps, LED Bulbs)
              </option>
              <option value="Electrical and Electronic Tools">
                Electrical and Electronic Tools (e.g., Drills, Saws)
              </option>
              <option value="Toys, Leisure, and Sports Equipment">
                Toys, Leisure, and Sports Equipment (e.g., Electric Toys,
                Fitness Equipment)
              </option>
              <option value="Medical Devices">
                Medical Devices (e.g., Thermometers, Blood Pressure Monitors)
              </option>
              <option value="Monitoring and Control Instruments">
                Monitoring and Control Instruments (e.g., Smoke Detectors,
                Thermostats)
              </option>
              <option value="Batteries and Accumulators">
                Batteries and Accumulators (e.g., Rechargeable Batteries, Car
                Batteries)
              </option>
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
    </React.Fragment>
  );
};

export default BookForm;
