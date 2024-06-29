import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecyclerDetails() {
  const { id } = useParams(); // Get the recycler id from URL
  const [recycler, setRecycler] = useState(null);

  useEffect(() => {
    async function fetchRecyclerDetails() {
      console.log("HERE");
      try {
        const response = await fetch(
          `http://localhost:5000/api/recyclers/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recycler details");
        }
        const data = await response.json();
        setRecycler(data); // Assuming data structure matches what you expect
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecyclerDetails();
  }, [id]);

//   if (!recycler) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h1>{recycler.name}</h1>
      <p>City: {recycler.city}</p>
      <p>Accepted E-waste: {recycler.acceptedEWaste.join(", ")}</p>
      <p>Pricing per Kg: ₹{recycler.pricingPerKg}</p>
      <p>Customer Rating: {recycler.customerRating}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default RecyclerDetails;
