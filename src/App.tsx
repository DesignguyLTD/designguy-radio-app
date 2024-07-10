import { useContext, useMemo } from "react";

import { AuthContext } from "./Contexts/authContext";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";

import Home from "./Pages/home";
import Radio from "./Components/Radio";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/navbar/Navbar";
import RadioPlayer from "./playground/play";
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
              <Navbar />
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Radio />} />
          {/* <Route path="/about" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/insights" element={<Home />} />
          <Route path="/locations" element={<Home />} /> */}
          <Route
            path="/test"
            element={
              <RadioPlayer
                streamUrl={
                  "http://radio.garden/api/ara/content/listen/MXOK6VOX/channel.mp3"
                }
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
