import React from "react";
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      {/* <img src="Codeforces.png" className="mx-2" alt="" /> */}
      <div className="text-center my-3 navbar">
        <h3>
          <blue style={{ color: "#4082CE" }}>CF</blue>
          <brown style={{ color: "#C44739" }}>analyst</brown>
        </h3>
      </div>

      <div className="section text-center">
        <h5 className="row1">Analyze</h5>
        <h5 className="row1">Compare</h5>
        <h5 className="row1">Virtual Rating</h5>
        <h5 className="row1">Services</h5>
        <h5 className="row1">Rank Predictor</h5>
        <h5 className="row1">Feedback</h5>
      </div>

    </div>
  );
};

export default Navbar;
