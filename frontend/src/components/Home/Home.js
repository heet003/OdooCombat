import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../hooks/auth-hook";

function Home(props) {
  const { role } = useAuth();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Manage Your E-Waste Efficiently</h1>
        <p>
          Join us in making the world a cleaner place. Recycle your e-waste
          responsibly with our easy-to-use platform.
        </p>
        {role === "user" && <Link to="/book">Book A Slot</Link>}
        {role === "recycler" && <Link to="/add">Advertise</Link>}
      </div>
      <div className="hero-image">
        <img src="./images/homeright.jpg" alt="Recycling" />
      </div>
    </section>
  );
}

export default Home;
