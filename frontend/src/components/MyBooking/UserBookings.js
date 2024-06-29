import React, { useEffect, useState } from "react";
import "./UserBookings.css";
import { useAuth } from "../hooks/auth-hook";

function UserBookings({ userId }) {
  const { token } = useAuth();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      if (token) {
        try {
          // console.log(token)
          const response = await fetch(
            `http://localhost:5000/api/users/getBook`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }
          const data = await response.json();
          console.log(data);
          setBookings(data.bookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      }
    }

    fetchBookings();
  }, [token]);

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <div className="booking-details">
                <p>
                  <strong>Booking ID:</strong> {booking._id}
                </p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <p>
                  <strong>Details:</strong> {booking.details}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserBookings;
