import React from "react";
import "../assets/styles/Footer.css";

function Footer() {
    const memberCount = 100;
    const averageCount = 75;
  
    return (
      <div
      className="footer-container">
        <div>
          <p className="footer-text">
            &copy; 2024 My App. All rights reserved.
          </p>
          <p className="footer-text">Member count:{memberCount}</p>
          <p>Average counting: {averageCount}</p>
        </div>
        <div className="content-3 row">
      </div>
    </div> 
    );
  }
  
  export default Footer;
  