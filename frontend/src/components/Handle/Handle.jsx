import React, { useState } from "react";
import "./Handle.css";

const Handle = () => {
  const [username, setUsername] = useState("");
  const [handle1, setHandle1] = useState("");
  const [handle2, setHandle2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.location.href = `/analysis?handle=${username}`;
  };
  const handleCompare = async (event) => {
    event.preventDefault();
    window.location.href = `/compare?handle1=${handle1}&handle2=${handle2}`;
  };


  return (
    <div>
      <div className="single handle">
        <form method="POST">
          <input
            className="input"
            type="text"
            name="analyze"
            id=""
            placeholder="Codeforces User Handle"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mx-2 btn-secondary px-2"
            style={{ borderRadius: "5px" }}
            onClick={handleSubmit}
          >
            Analyze
          </button>
        </form>
      </div>

      <div className="compare mt-4 handle">
        <form method="POST">
          <input
            className="input"
            type="text"
            name="analyze"
            id=""
            placeholder="Handle 1"
            required
            onChange={(e) => {
              setHandle1(e.target.value);
            }}
          />
          <input
            className="input mx-3"
            type="text"
            name="analyze"
            id=""
            placeholder="Handle 2"
            required
            onChange={(e) => {
              setHandle2(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mx-2 btn-secondary px-2"
            style={{ borderRadius: "5px" }}
            onClick={handleCompare}
          >
            Compare
          </button>
        </form>
      </div>
    </div>
  );
};

export default Handle;
