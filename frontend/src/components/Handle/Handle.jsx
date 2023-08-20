import React, { useState } from 'react';
import "./Handle.css";

const Handle = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      window.location.href = `/analysis?handle=${username}`;
    
  };

  return (
    <div className='handle'>
      <form method="POST">
        <input
          className='input'
          type="text"
          name="analyze"
          id=""
          placeholder='Codeforces User Handle'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Analyze
        </button>
      </form>
    </div>
  );
};

export default Handle;
