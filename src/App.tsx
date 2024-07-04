import { useContext, useMemo } from "react";
import { AuthContext } from "./Contexts/authContext";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";

import Home from "./Pages/home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Search from "./Components/Search";
import Navbar from "./Components/navbar/Navbar";
import "./App.css";

console.log = function no_console() {};

const ProtectedRoute = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn ?? false;
  const accessToken = authContext?.accessToken ?? "";

  const isTokenValid = useMemo(() => {
    if (!accessToken || !isLoggedIn) return false;

    try {
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() < expirationTime;
    } catch (error) {
      console.error("Error decoding/accessing token:", error);
      return false;
    }
  }, [accessToken, isLoggedIn]);

  return (
      <Router basename="/designguy-radio-app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <div>
                404, Go back to <Link to="/">HomePage</Link>{" "}
              </div>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn && isTokenValid}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/projects" element={<div>Projects Page</div>} />
          <Route path="/insights" element={<div>Insights Page</div>} />
          <Route path="/locations" element={<div>Locations Page</div>} />
        </Routes>
        <Search />
      </Router>
  );
}

export default App;
