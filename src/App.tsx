import "./App.css";

import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useContext, useMemo } from "react";

import { AuthContext } from "./Contexts/authContext";
import Home from "./Pages/home";
import Login from "./Components/Login";
import Radio from "./Components/Radio";
import SignUp from "./Components/SignUp";

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

<<<<<<< HEAD
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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/play" element={<Radio />} />
      </Routes>
    </Router>
  );
=======
        try {
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;
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
                <Route path="*" element={<div>404, Go back to <Link to='/'>HomePage</Link> </div>} />
                <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn && isTokenValid}><Home /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
>>>>>>> 5e4a38b9138b0fbda316eb07768e097313ed0ba1
}

export default App;
