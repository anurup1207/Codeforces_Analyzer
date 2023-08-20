import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Analyze.css";
const Analyze = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const handle = searchParams.get("handle");
  console.log(handle);
  const [data, setData] = useState();

  const [levels, setLevels] = useState({
    options: {
      chart: {
        id: "basic-bar",
        dataLabels: {
          enabled: false, // This line will hide the values on the chart
        },
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });
  const [rating, setRating] = useState({
    options: {
      chart: {
        id: "basic-bar",
        dataLabels: {
          enabled: false, // This line will hide the values on the chart
        },
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });
  const getApiData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/analyze",
        {
          username: handle,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.self1.result);
      console.log(response.data.self1.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, [handle]);
  useEffect(() => {
    if (data) {
      const categories = [];
      const seriesData = [];
      const rating=[];
      const solved=[];
      for (let key in data.level) {
        categories.push(key);
        seriesData.push(data.level[key]);
      }
      const sortedCategories = categories.slice().sort().reverse();
      // console.log(data.level);
      // const seriesData = data.map(item => item.value);

      setLevels((prevLevels) => ({
        options: {
          chart: {
            id: "basic-bar",
          },
          dataLabels: {
            enabled: false, 
          },
          xaxis: {
            categories: sortedCategories,
          },
        },
        series: [
          {
            name: "Solved",
            data: seriesData,
          },
        ],
      }));

      for(let key in data.question_rating){
        rating.push(key);
        solved.push(data.question_rating[key]);
      }
      const sortedRating = rating.slice().sort().reverse();
      setRating((prevRating) => ({
        options: {
          chart: {
            id: "basic-bar",
          },
          dataLabels: {
            enabled: false, 
          },
          xaxis: {
            categories: sortedRating,
          },
        },
        series: [
          {
            name: "Solved",
            data: solved,
          },
        ],
      }));
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="row">
          <div className="py-4 px-5" id="user">
            <h2>{handle}</h2>
            <p>
              Current rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.current_rating}
              </span>{" "}
              ; Max rating:{" "}
              <span style={{ color: "#4BA59E" }}>
                {data?.contest_details?.max_rating}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="row" id="rat_tag">
          <div className="col-6">Rating Graph</div>
          <div className="col-6">Tags</div>
        </div>

      {/* Problem Description  */}
        <div className="row" id="prob_desc">
          <div className="col-6 px-2" id="level">
            <h5>Levels</h5>
            <Chart
              options={levels.options}
              series={levels.series}
              type="bar"
              width="500"
            />
          </div>
          <div className="col-6 px-2" id="prob_rat">
            <h5>Problem Ratings</h5>
            <Chart
              options={rating.options}
              series={rating.series}
              type="bar"
              width="500"
            />
          </div>
        </div>

   {/* <--------------------------------------------------------------------------------->  */}


        <div className="row" id="details">
          <div className="col-6" id="ques_detail">
            <h5 className="text-start">Details</h5>
            <div className="row">
              <div className="col-6 text-start">No. of Contests</div>
              <div className="col-6 text-end">
                {data?.contest_details?.Number_of_contests}
              </div>
              <div className="col-6 text-start">Tried</div>
              <div className="col-6 text-end">
                {data?.question_details?.tried}
              </div>
              <div className="col-6 text-start">Solved</div>
              <div className="col-6 text-end">
                {data?.question_details?.solved}
              </div>
              <div className="col-6 text-start">Average Attempts</div>
              <div className="col-6 text-end">
                {data?.question_details?.average}
              </div>
              <div className="col-6 text-start">Maximum Attempts</div>
              <div className="col-6 text-end">
                {data?.question_details?.max_attempt?.max_attempt}
              </div>
              <div className="col-6 text-start">Solved in 1st Attempt</div>
              <div className="col-6 text-end">
                {
                  data?.question_details?.attempt_one
                    ?.Solved_with_one_submission
                }{" "}
                {`(${data?.question_details?.attempt_one?.percentage}%)`}
              </div>
              <div className="col-6 text-start">Max Up</div>
              <div className="col-6 text-end">
                {data?.contest_details?.max_up?.max_up}{" "}
                <a
                  target="_blank"
                  href={data?.contest_details?.max_up?.link}
                  style={{ textDecoration: "none" }}
                >{`(${data?.contest_details?.max_up?.contest})`}</a>
              </div>
              <div className="col-6 text-start">Max Down</div>
              <div className="col-6 text-end">
                {data?.contest_details?.max_down?.max_down}{" "}
                <a
                  target="_blank"
                  href={data?.contest_details?.max_down?.link}
                  style={{ textDecoration: "none" }}
                >{`(${data?.contest_details?.max_down?.contest})`}</a>
              </div>
            </div>
          </div>
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
        <div className="row text-center" id="unsolved">
          Unsolved
        </div>
      </div>
    </>
  );
};

export default Analyze;
