import React from "react";
import axios from "axios";
import "./Compare.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Compare = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const handle1 = searchParams.get("handle1");
  const handle2 = searchParams.get("handle2");
  console.log(handle1);
  console.log(handle2);

  const [data, setData] = useState();
  const getApiData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/compare",
        {
          username1: handle1,
          username2: handle2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.result.result);
      console.log(
        response.data.result.result
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [handle1, handle2]);
  return (
    <>
      <div style={{ maxWidth: "1500px", margin: "auto" }}>
        <div className="row">
          <div className="col-6">
            <h2>{handle1}</h2>
            <p>
              Current rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.handle1?.current_rating}
              </span>{" "}
              ; Max rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.handle1?.max_rating}
              </span>{" "}
            </p>
          </div>
          <div className="col-6">
            <h2>{handle2}</h2>
            <p>
              Current rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.handle2?.current_rating}
              </span>{" "}
              ; Max rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.handle2?.max_rating}
              </span>{" "}
            </p>
          </div>
        </div>

        <div className="common-contest">
          <div className="row">
            <h5>Common Contest</h5>
            <h5>{handle1}</h5>
            <h5>{handle2}</h5>
              <h5>Distance</h5>
            {data?.contest_rating.map(
              (item, index) => (
                <div className="col-12" key={index}>
                  <div className="row">
                    <div className="col-6">
                      <p>{item?.name}</p>
                    </div>
                    <div className="col-2">
                      
                    </div>
                    <div className="col-2">
                    </div>
                    <div className="col-2">
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
