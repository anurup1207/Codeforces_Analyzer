import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      {/* <img src="Codeforces.png" className="mx-2" alt="" /> */}
      <div className="my-3">
        <h3 className="text-center cf">
        <Link to="/" style={{textDecoration:'none',color:'black'}}>
          <img src="Codeforces.png" alt="" className=" mx-1" />
          <blue style={{ color: "#4082CE" }}>CF</blue>
          <brown style={{ color: "#C44739" }}>analyst</brown>
          </Link>
        </h3>
      </div>

      <div className="section my-5 ">
        <div className="mx-2"><img src="statistic 1.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/analysis" style={{textDecoration:'none',color:'black'}}>Analyze</Link></h5></div>
        <div className="mx-2"><img src="transfer.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/compare" style={{textDecoration:'none',color:'black'}}>Compare</Link></h5></div>
        <div className="mx-2"><img src="Menu icon.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/virtual" style={{textDecoration:'none',color:'black'}}>Virtual Rating</Link></h5></div>
        <div className="mx-2"><img src="gift.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/services" style={{textDecoration:'none',color:'black'}}>Services</Link></h5></div>
        <div className="mx-2"><img src="rank.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/rank" style={{textDecoration:'none',color:'black'}}>Rank Predictor</Link></h5></div>
        <div className="mx-2"><img src="feedback.png" alt="" /><h5 className="my-4 mx-1 features"><Link to="/feedback" style={{textDecoration:'none',color:'black'}}>Feedback</Link></h5></div>
      </div>

    </div>
  );
};

export default Navbar;
