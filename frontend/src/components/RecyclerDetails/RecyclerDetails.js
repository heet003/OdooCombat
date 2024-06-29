import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecyclerDetails.css";

function RecyclerDetails() {
  const { id } = useParams(); // Get the recycler id from URL
  const [recycler, setRecycler] = useState(null);

  useEffect(() => {
    async function fetchRecyclerDetails() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recyclers/${id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recycler details");
        }
        const data = await response.json();
        setRecycler(data.data[0]); // Assuming data structure matches what you expect
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecyclerDetails();
  }, [id]);

  if (!recycler) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recycler-details">
      <h1 className="recycler-name">{recycler.name}</h1>
      <p className="recycler-city">City: {recycler.city}</p>
      <p className="recycler-accepted-ewaste">
        Accepted E-waste: {recycler.accepted_e_waste.join(", ")}
      </p>
      <p className="recycler-pricing">
        Pricing per Kg: ₹{recycler.pricing_per_kg}
      </p>
      <p className="recycler-rating">
        Customer Rating: {recycler.customer_rating}
      </p>
      <p className="recycler-address">Address: {recycler.address}</p>
      <div className="recycler-contact">
        <p>Contact:</p>
        <p>Phone: {recycler.contact.phone}</p>
        <p>Email: {recycler.contact.email}</p>
      </div>
      <div className="recycler-processing-info">
        <h3>Processing Information:</h3>
        <p>
          <strong>Dismantling:</strong> {recycler.processing_info.dismantling}
        </p>
        <p>
          <strong>Sorting:</strong> {recycler.processing_info.sorting}
        </p>
        <p>
          <strong>Shredding:</strong> {recycler.processing_info.shredding}
        </p>
        <p>
          <strong>Recycling:</strong> {recycler.processing_info.recycling}
        </p>
      </div>
      <div className="recycler-service-areas">
        <h3>Service Areas:</h3>
        <p>{recycler.service_areas.join(", ")}</p>
      </div>
      <div className="recycler-testimonials">
        <h3>Testimonials:</h3>
        {recycler.testimonials.map((testimonial, index) => (
          <p key={index}>"{testimonial}"</p>
        ))}
      </div>
    </div>
  );
}

export default RecyclerDetails;
