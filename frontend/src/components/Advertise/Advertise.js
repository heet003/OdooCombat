import React, { useState } from "react";
import "./Advertise.css";
import { useAuth } from "../hooks/auth-hook";
import ErrorModal from "../Shared/UIElements/ErrorModal";
import LoadingSpinner from "../Shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";

const EWasteRecyclerForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [recyclerData, setRecyclerData] = useState({
    name: "",
    city: "",
    email: "",
    acceptedEWaste: [],
    serviceAreas: [],
    pricingPerKg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecyclerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recyclerData);
    try {
      await sendRequest(
        "http://localhost:5000/api/recyclers/add",
        "POST",
        JSON.stringify(recyclerData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding e-waste recycler:", error.message);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <div className="recycler-form">
        <h2>Add E-Waste Recycler</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recyclerData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={recyclerData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={recyclerData.city}
            onChange={handleChange}
            required
          />

          <label>Accepted E-Waste:</label>
          {recyclerData.acceptedEWaste.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updatedEWaste = [...recyclerData.acceptedEWaste];
                  updatedEWaste[index] = e.target.value;
                  setRecyclerData((prevData) => ({
                    ...prevData,
                    acceptedEWaste: updatedEWaste,
                  }));
                }}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedEWaste = [...recyclerData.acceptedEWaste];
                    updatedEWaste.splice(index, 1);
                    setRecyclerData((prevData) => ({
                      ...prevData,
                      acceptedEWaste: updatedEWaste,
                    }));
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setRecyclerData((prevData) => ({
                ...prevData,
                acceptedEWaste: [...prevData.acceptedEWaste, ""],
              }))
            }
          >
            Add Accepted E-Waste
          </button>

          <label>Service Areas:</label>
          {recyclerData.serviceAreas.map((area, index) => (
            <div key={index}>
              <input
                type="text"
                value={area}
                onChange={(e) => {
                  const updatedAreas = [...recyclerData.serviceAreas];
                  updatedAreas[index] = e.target.value;
                  setRecyclerData((prevData) => ({
                    ...prevData,
                    serviceAreas: updatedAreas,
                  }));
                }}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedAreas = [...recyclerData.serviceAreas];
                    updatedAreas.splice(index, 1);
                    setRecyclerData((prevData) => ({
                      ...prevData,
                      serviceAreas: updatedAreas,
                    }));
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setRecyclerData((prevData) => ({
                ...prevData,
                serviceAreas: [...prevData.serviceAreas, ""],
              }))
            }
          >
            Add Service Area
          </button>

          <label htmlFor="pricingPerKg">Pricing per Kg:</label>
          <input
            type="number"
            id="pricingPerKg"
            name="pricingPerKg"
            value={recyclerData.pricingPerKg}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EWasteRecyclerForm;
