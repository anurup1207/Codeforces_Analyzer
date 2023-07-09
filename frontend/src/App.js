import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <div className="row">
        <div className="col-2" id="navbar">
          <Navbar />
        </div>
        <div className="col-10">
          <div className="row">
            <div className="py-4 px-5" id="user">
              <h2>HARSHA1309</h2>
               <p>Current rating: <span style={{color:'#4BA59E'}}>1449</span> ;Max rating: <span style={{color:'#4BA59E'}}>1477</span>  </p>
            </div>
          </div>
          <div className="row" id="rat_tag">
            <div className="col-6">Rating Graph </div>
            <div className="col-6">Tags</div>
          </div>
          <div className="row" id="level">
            <div className="col-6">Levels</div>
            <div className="col-6">Problem Ratings</div>
          </div>
          <div className="row" id="details">
            <div className="col-6">Details</div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">Best Rank</div>
                <div className="col-6">Languages</div>
              </div>
              <div className="row">
                <div className="col-6">Worst Rank</div>
                <div className="col-6">Verdicts</div>
              </div>
            </div>
          </div>
          <div className="row text-center" id="unsolved">Unsolved</div>
        </div>
      </div>
    </>
  );
};

export default App;
