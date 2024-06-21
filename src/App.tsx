import React from "react";
import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/About" element={<div>About Page</div>} />
          <Route path="/Projects" element={<div>Projects Page</div>} />
          <Route path="/Insights" element={<div>Insights Page</div>} />
          <Route path="/Locations" element={<div>Locations Page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;