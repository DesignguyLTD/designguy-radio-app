import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
      <Router basename="/designguy-radio-app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
