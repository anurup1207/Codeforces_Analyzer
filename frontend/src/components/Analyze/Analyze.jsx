import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Analyze.css";
const Analyze = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const handle = searchParams.get("handle");
  console.log(handle);
  const [data, setData] = useState();
  const colors = ["#FF5733", "#33FF57", "#3366FF", "#FF33CC", "#FFFF33"];
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
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });
  const [prob_rating, setProb_rating] = useState({
    options: {
      chart: {
        id: "basic-bar",
        dataLabels: {
          enabled: false,
        },
      },
      xaxis: {
        categories: [],
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  const [language, setLanguage] = useState({
    options: {},
    series: [],
    labels: [],
  });
  const [verdict, setVerdict] = useState({
    options: {},
    series: [],
    labels: [],
  });
  const [tags, setTags] = useState({
      options: {
        chart: {
          type: 'pie',
        },
        legend: {
          show: true,
          position: 'right', // You can adjust the position of the legend
          formatter: function (seriesName, opts) {
            const tagIndex = opts.seriesIndex;
            // const tagName=tagSeries[tagIndex];
            const value=opts.w.globals.series[tagIndex];
            return `${seriesName} - ${value}`;
          },
        },
      },
    series: [],
    labels: [],
  });
  const [rating, setRating] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  })
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
      const prob_rating = [];
      const solved = [];
      const series = [];
      const labels = [];
      const submission = [];
      const sub_resp = [];
      const tagSeries=[];
      const ques_solved=[];
      const chartLabels = []; 
      for (let key in data.level) {
        categories.push(key);
        seriesData.push(data.level[key]);
      }
      const sortedCategories = categories.slice().sort().reverse();
      const sortedSeriesData = sortedCategories.map(category => data.level[category]);
      const colorSeries = sortedCategories.map((value, index) => {
        return {
          y: value,
          color: colors[index % colors.length], // Assign colors to each data point
        };
      });
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
            data: sortedSeriesData,
          },
        ],
      }));

      for (let key in data.question_rating) {
        prob_rating.push(key);
        solved.push(data.question_rating[key]);
      }
      const numericRating = prob_rating.map(parseFloat);

      // Sort the numericRating array in descending order
      const sortedRating = numericRating.slice().sort((a, b) => b - a);
      // const sortedRating = rating.slice().sort().reverse();
      // Sort the solved array based on the sortedRating order
const sortedSolved = solved.map((_, index) => solved[numericRating.indexOf(sortedRating[index])]);
      setProb_rating((prevProb_rating) => ({
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
            data: sortedSolved,
          },
        ],
      }));
      for (let key in data.verdict) {
        submission.push(key);
        sub_resp.push(data.verdict[key]);
      }
      console.log(submission);
      console.log(sub_resp);
      setVerdict((prevVerdict) => ({
        ...prevVerdict,
        options: {},
        series: sub_resp,
        labels: submission,
      }));


      for (let key in data.tags) {
        tagSeries.push(key);
        ques_solved.push(data.tags[key]);
        // chartLabels.push(`${key} - ${data.tags[key]}`);
      }
      
      console.log("Tag series is " +tagSeries);
      console.log(ques_solved);
      console.log(chartLabels);
      setTags((prevTags) => ({
        ...prevTags,
        options: {},
        series: ques_solved,
        labels: tagSeries,
      }));
    }
  }, [data]);

  return (
    <>
      <div style={{maxWidth:'1500px',margin:'auto'}}>
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

        <div id="rating" className="mt-2 ">
          <div className="col-12 px-2">
            <h5>Rating</h5>
            <Chart
              options={rating.options}
              series={rating.series}
              type="line"
              width="800"
              height="300"
            />
          </div>
        </div>
        <div id="tags" className="mt-4">
          <div className="col-12 ">
            <h5>Tags</h5>
            <div style={{display:'flex',alignContent:'center',justifyContent:'center'}}>
            <Chart
                  options={tags.options}
                  series={tags.series}
                  // labels={tags.labels}
                  type="pie"
                  width="500"
                />
                </div>
          </div>
        </div>

        {/* Problem Description  */}
        <div id="level" className="mt-4">
          <div className="col-12 mx-2">
            <h5>Levels</h5>
            <Chart
              options={levels.options}
              series={levels.series}
              type="bar"
              width="870"
              height="300"
            />
          </div>
        </div>
        <div id="prob_rat">
          <div className="col-12 ">
            <h5 className="mt-3 mx-2">Problem Ratings</h5>
            <Chart
              options={prob_rating.options}
              series={prob_rating.series}
              type="bar"
              width="870"
              height="300"
            />
          </div>
        </div>

        {/* <--------------------------------------------------------------------------------->  */}

        <div className="row" id="details">
          <div className="col-4" id="ques_detail">
            <h5
              className="text-start"
              style={{
                fontFamily: "PT Sans",
                fontWeight: "500",
                fontSize: "18px",
                color: "#09244B",
              }}
            >
              Details
            </h5>
            <div className="row mt-3">
              <div className="col-6 text-start left">No. of Contests</div>
              <div className="col-6 text-end right">
                {data?.contest_details?.Number_of_contests}
              </div>
              <div className="col-6 text-start left">Tried</div>
              <div className="col-6 text-end right">
                {data?.question_details?.tried}
              </div>
              <div className="col-6 text-start left">Solved</div>
              <div className="col-6 text-end right">
                {data?.question_details?.solved}
              </div>
              <div className="col-6 text-start left">Average Attempts</div>
              <div className="col-6 text-end right">
                {data?.question_details?.average}
              </div>
              <div className="col-6 text-start left">Maximum Attempts</div>
              <div className="col-6 text-end right">
                {data?.question_details?.max_attempt?.max_attempt} <Link to={data?.question_details?.max_attempt?.link} target="_blank" style={{textDecoration:'none'}}> {`(${data?.question_details?.max_attempt?.problem_name})`}</Link>
              </div>
              <div className="col-6 text-start left">Solved in 1st Attempt</div>
              <div className="col-6 text-end right">
                {
                  data?.question_details?.attempt_one
                    ?.Solved_with_one_submission
                }{" "}
                {`(${data?.question_details?.attempt_one?.percentage}%)`}
              </div>
              <div className="col-6 text-start left">Max Up</div>
              <div className="col-6 text-end right">
                {data?.contest_details?.max_up?.max_up}{" "}
                <Link to={data?.contest_details?.max_up?.link}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >{`(${data?.contest_details?.max_up?.contest})`}</Link>
              </div>
              <div className="col-6 text-start left">Max Down</div>
              <div className="col-6 text-end right">
                {data?.contest_details?.max_down?.max_down}{" "}
                <Link to={data?.contest_details?.max_down?.link}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >{`(${data?.contest_details?.max_down?.contest})`}</Link>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <div
                className="col-5 mx-4"
                style={{
                  backgroundColor: "rgb(218 234 249 / 50%)",
                  borderRadius: "10px",
                }}
              >
                <h5
                  className="mt-2 mx-5"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "20px",
                    color: "#696969",
                    textTransform: "uppercase",
                  }}
                >
                  Best Rank
                </h5>
                <h1 className="best_rank mt-4 text-end pr-2 mx-5">
                  <Link
                    to={data?.contest_details?.best_rank?.link}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    {data?.contest_details?.best_rank?.best_rank}
                  </Link>
                </h1>
              </div>
              <div
                className="col-5 "
                style={{
                  backgroundColor: "rgb(218 234 249 / 50%)",
                  borderRadius: "10px",
                }}
              >
                <h5
                  className=" mx-5 mt-2"
                  style={{
                    fontFamily: "Manrope",
                    fontSize: "20px",
                    color: "#696969",
                    textTransform: "uppercase",
                  }}
                >
                  Worst Rank
                </h5>
                <h1 className="worst_rank mt-4 text-end pr-2 mx-5">
                  <Link
                    to={data?.contest_details?.worst_rank?.link}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    {data?.contest_details?.worst_rank?.worst_rank}
                  </Link>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-5 mt-3" id="lang">
                <h5>Languages</h5>
                <Chart
                  options={language.options}
                  series={language.series}
                  type="donut"
                  width="300"
                />
              </div>
              <div className="col-5 mt-3" id="verdict">
                <h5>Verdicts</h5>
                <Chart
                  options={verdict.options}
                  series={verdict.series}
                  type="pie"
                  width="330"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row " id="unsolved">
          <h5
            className="text-center mt-2 pt-2"
            style={{
              fontFamily: "Manrope",
              fontSize: "20px",
              fontWeight: "800",
              color: "#E57676",
            }}
          >
            Unsolved
          </h5>
          <p className="mt-3 text-start">
            {data?.unsolved.map((item, index) => (
              <Link
                to={item?.link}
                style={{
                  textDecoration: "none",
                  fontFamily: "Questrial",
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#8491A5",
                }}
                target="_blank"
              >
                <span className="text-center" key={index}>
                  {item?.problem_name}, &nbsp;
                </span>
              </Link>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Analyze;
