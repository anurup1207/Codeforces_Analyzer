import React from "react";
import axios from "axios";
import Chart from "react-apexcharts";
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

  const [rating,setRating]=useState({
    options: {
      chart: {
        type: "bar",
        dataLabels: {
          enabled: false,
        },
      },
      xaxis: {
        categories: ["Current Rating","Max Rating","Min Rating"],
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
    },
    series: [
      {
        name: {handle1},
        data1: [data?.contest_details?.handle1?.current_rating,data?.contest_details?.handle1?.max_rating],
      },
      {
        name: {handle2},
        data2: [data?.contest_details?.handle2?.current_rating,data?.contest_details?.handle2?.max_rating],
      },
    ],
  })

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

        <div className="row">
          <div className="col-5 rating">
          <Chart
              options={rating.options}
              series={rating.series}
              type="bar"
              width="800"
              height="300"
            />
          </div>
          <div className="col-5 contest"></div>
        </div>
        
      </div>
    </>
  );
};

export default Compare;
