import React, { useState, useContext } from "react";

import Button from "../Shared/FormElements/Button";
import ErrorModal from "../Shared/UIElements/ErrorModal";
import LoadingSpinner from "../Shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

// const eWastePref = [
//   {
//     id: 1,
//     value: "Large Household Appliances (e.g., Refrigerators, Washing Machines)",
//   },
//   {
//     id: 2,
//     value: "Small Household Appliances (e.g., Toasters, Hair Dryers)",
//   },
//   {
//     id: 3,
//     value: "IT and Telecommunications Equipment (e.g., Computers, Phones)",
//   },
//   {
//     id: 4,
//     value: "Consumer Electronics (e.g., TVs, Audio Equipment)",
//   },
//   {
//     id: 5,
//     value: "Lighting Equipment (e.g., Lamps, LED Bulbs)",
//   },
//   {
//     id: 6,
//     value: "Electrical and Electronic Tools (e.g., Drills, Saws)",
//   },
//   {
//     id: 7,
//     value:
//       "Toys, Leisure, and Sports Equipment (e.g., Electric Toys, Fitness Equipment)",
//   },
//   {
//     id: 8,
//     value: "Medical Devices (e.g., Thermometers, Blood Pressure Monitors)",
//   },
//   {
//     id: 9,
//     value:
//       "Monitoring and Control Instruments (e.g., Smoke Detectors, Thermostats)",
//   },
//   {
//     id: 10,
//     value:
//       "Batteries and Accumulators (e.g., Rechargeable Batteries, Car Batteries)",
//   },
// ];

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, setFormState] = useState({
    type: {
      value: "",
    },
    name: {
      value: "",
    },
    email: {
      value: "",
    },
    password: {
      value: "",
    },
    contactNumber: {
      value: "",
    },
    address: {
      value: "",
    },
    // eWastePreferences: {
    //   value: [], // Initialize as an empty array
    // },
  });

  // Handler to toggle between login and signup modes
  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Generalized input change handler
  const inputHandler = (id, value, type = "text") => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: {
        value:
          type === "checkbox"
            ? { ...prevState[id].value, [value]: !prevState[id].value[value] }
            : value,
      },
    }));
  };

  // Submit handler for login or signup
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let responseData;
      if (isLoginMode) {
        responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.email.value,
            password: formState.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } else {
        responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            type: formState.type.value,
            name: formState.name.value,
            email: formState.email.value,
            contactNumber: formState.contactNumber.value,
            password: formState.password.value,
            address: formState.address.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      }
      auth.login(responseData.userId, responseData.token, responseData.role);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="form_header">Login Required</h2>
        <hr />
        <form className="auth_form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <React.Fragment>
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                value={formState.type.value}
                onChange={(e) => inputHandler("type", e.target.value)}
              >
                <option value="">Select</option>
                <option value="user">User</option>
                <option value="business">Business</option>
                <option value="recycler">Recycler</option>
              </select>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                onChange={(e) => inputHandler("name", e.target.value)}
                value={formState.name.value}
              />
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                id="contactNumber"
                type="number"
                placeholder="Contact Number"
                onChange={(e) => inputHandler("contactNumber", e.target.value)}
                value={formState.contactNumber.value}
              />
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                placeholder="Address"
                onChange={(e) => inputHandler("address", e.target.value)}
                value={formState.address.value}
              />
              {/* <div>
                {eWastePref.map((pref) => (
                  <label htmlFor={pref.id} key={pref.id}>
                    <input
                      type="checkbox"
                      id={pref.id}
                      value={pref.value}
                      // checked={formState.eWastePreferences.value.includes(
                      //   pref.value
                      // )}
                      onChange={() =>
                        inputHandler(
                          "eWastePreferences",
                          pref.value,
                          "checkbox"
                        )
                      }
                    />
                    {pref.value}
                  </label>
                ))}
              </div> */}
            </React.Fragment>
          )}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="E-Mail"
            onChange={(e) => inputHandler("email", e.target.value)}
            value={formState.email.value}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => inputHandler("password", e.target.value)}
            value={formState.password.value}
          />
          <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Auth;
