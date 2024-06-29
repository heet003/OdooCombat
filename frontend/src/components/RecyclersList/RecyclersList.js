import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./RecyclersList.css";

function RecyclersList(props) {
  const [city, setCity] = useState("");
  const [recyclerData, setRecyclerData] = useState([
    {
      name: "Ahmedabad E-Waste Recyclers",
      contact: {
        phone: "+91 98765XXXXX",
        email: "info@ahmedabadewaste.com",
      },
      city: "Ahmedabad",
      address: "101, Green Tech Park, S.G. Highway, Ahmedabad, Gujarat, India",
      acceptedEWaste: [
        "Computers",
        "Laptops",
        "Mobile phones",
        "Printers",
        "Electronic accessories",
      ],

      service_areas: ["Ahmedabad city", "Nearby regions"],
      testimonials: [
        "Ahmedabad E-Waste Recyclers provided effective and eco-friendly e-waste solutions.",
      ],
      customer_rating: 4.7,
      pricingPerKg: 14,
    },
  ]);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/recyclers/", {
        method: "POST",
        body: JSON.stringify({ city }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setRecyclerData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <div className="main">
        <div className="search-container">
          <form onSubmit={submitHandler}>
            <input
              className="search_input"
              type="text"
              placeholder="Search..."
              name="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">
              <img src="./images/search.png" alt="Search" />
            </button>
          </form>
        </div>

        {recyclerData.map((recycler) => (
          <Link
            key={recycler._id}
            to={`/recycler/${recycler._id}`} // Update with your link structure
            className="recycler_container_link"
          >
            <div className="container">
              <h1 className="name">{recycler.name}</h1>
              <p>
                <strong className="sub_head">City:</strong>{" "}
                <span className="sub_info" id="city">
                  {recycler.city[0].toUpperCase() + recycler.city.slice(1)}
                </span>
              </p>
              <p>
                <strong className="sub_head">Accepted E-waste:</strong>{" "}
                <span className="sub_info" id="accepted">
                  {recycler.accepted_e_waste.join(", ")}
                </span>
              </p>
              <p>
                <strong className="sub_head">Pricing per Kg:</strong>{" "}
                <span className="sub_info" id="price">
                  ₹{recycler.pricing_per_kg}
                </span>
              </p>
              <p>
                <strong className="sub_head">Customer Rating:</strong>{" "}
                <span className="sub_info" id="rating">
                  {recycler.customer_rating}
                </span>
                <span
                  id="star-rating"
                  dangerouslySetInnerHTML={{
                    __html: generateStars(recycler.customerRating),
                  }}
                ></span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}

// Function to generate star rating HTML based on a given rating
function generateStars(rating) {
  const fullStar = '<i class="fas fa-star"></i>';
  const halfStar = '<i class="fas fa-star-half-alt"></i>';
  const emptyStar = '<i class="far fa-star"></i>';
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += fullStar;
    } else if (rating >= i - 0.5) {
      stars += halfStar;
    } else {
      stars += emptyStar;
    }
  }

  return stars;
}

export default RecyclersList;
