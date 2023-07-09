import React from "react";
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      {/* <img src="Codeforces.png" className="mx-2" alt="" /> */}
      <div className="my-3">
        <h3 className="text-center cf">
          <img src="Codeforces.png" alt="" className=" mx-1" />
          <blue style={{ color: "#4082CE" }}>CF</blue>
          <brown style={{ color: "#C44739" }}>analyst</brown>
        </h3>
      </div>

      <div className="section my-5 ">
        <div className="mx-2"><img src="statistic 1.png" alt="" /><h5 className="my-4 mx-1 features">Analyze</h5></div>
        <div className="mx-2"><img src="transfer.png" alt="" /><h5 className="my-4 mx-1 features">Compare</h5></div>
        <div className="mx-2"><img src="Menu icon.png" alt="" /><h5 className="my-4 mx-1 features">Virtual Rating</h5></div>
        <div className="mx-2"><img src="gift.png" alt="" /><h5 className="my-4 mx-1 features">Services</h5></div>
        <div className="mx-2"><img src="rank.png" alt="" /><h5 className="my-4 mx-1 features">Rank Predictor</h5></div>
        <div className="mx-2"><img src="feedback.png" alt="" /><h5 className="my-4 mx-1 features">Feedback</h5></div>
      </div>

    </div>
  );
};

export default Navbar;
