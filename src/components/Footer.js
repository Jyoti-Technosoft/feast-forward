import React from "react";

function Footer() {
    const memberCount = 100;
    const averageCount = 75;
  
    return (
      <div
        className="footer-container"
        style={{
          backgroundColor: '#333',
          color: '#fff',
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
        >
        <div>
          <p style={{ marginBottom: '0rem' }}>
            &copy; 2024 My App. All rights reserved.
          </p>
          <p style={{ marginBottom: '0rem' }}>Member count: {memberCount}</p>
          <p>Average counting: {averageCount}</p>
        </div>
        <div className="content-3 row">
      </div>
    </div> 
    );
  }
  
  export default Footer;
  