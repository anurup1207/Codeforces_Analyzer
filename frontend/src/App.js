import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Analyze from "./components/Analyze/Analyze";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Handle from "./components/Handle/Handle";
import Compare from "./components/Compare/Compare";

const App = () => {
  return (
    <>
      <Router>
        <div className="row">
          <div className="col-2" id="navbar">
            <Navbar />
          </div>
          <div className="col-10">
            <Routes>
              <Route exact path="/" element={<Handle/>}/>
              <Route exact path="/analysis" element={<Analyze/>}/>
              <Route exact path="/compare" element={<Compare/>}/>
              
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
