import React from "react";
import "./About.css";

function About(props) {
  return (
    <div>
      <section id="about">
        <h2 id="about-text">
          About
          <b> E-Waste Management</b>
        </h2>
        <br />
        <br />
        <div class="container">
          <div class="grid">
            <div class="grid-item image">
              <img src="./images/Aboutus_img1.png" alt="E-Waste Management" />
            </div>
            <div class="grid-item text">
              <p>
                Welcome to our e-waste management webpage! Here, we are
                dedicated to promoting responsible and sustainable practices for
                the disposal and recycling of electronic waste. Our goal is to
                protect the environment, conserve valuable resources, and raise
                awareness about the impact of e-waste on our planet.
              </p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="grid">
            <div class="grid-item text">
              <p>
                We understand the growing concern surrounding the improper
                handling of electronic waste and its detrimental effects on both
                human health and the environment. With our expertise in e-waste
                management, we offer comprehensive solutions to individuals,
                businesses, and communities, ensuring that their electronic
                devices are handled and disposed of responsibly.
              </p>
            </div>
            <div class="grid-item image">
              <img src="./images/aboutus_img2.png" alt="E-Waste Management" />
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </div>
  );
}

export default About;
