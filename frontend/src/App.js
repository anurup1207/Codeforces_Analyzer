import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <>
    <div className="row">
      <div className="col-2" id="navbar">
        <Navbar/>
      </div>
    </div>
    </>
  )
}

export default App