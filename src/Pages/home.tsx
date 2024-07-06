import React, { useContext } from "react";

import { AuthContext } from "../Contexts/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
  };
  return (
    <div>
      home
      <br />
      <Link style={{ cursor: "pointer" }} to="/signup">
        Sign Up
      </Link>
      <br />
      {authContext?.isLoggedIn ? (
        <div style={{ cursor: "pointer" }} onClick={handleLogout}>
          Logout
        </div>
      ) : (
        <Link style={{ cursor: "pointer" }} to="login">
          Login
        </Link>
      )}
      <br />
      <Link to="play">
        <button> P & P </button>
      </Link>
    </div>
  );
};

export default Home;
