import "./App.css";
import {Route, BrowserRouter as Router, Routes, Navigate, Link} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Pages/home";
import { useContext, useMemo } from "react";
import { AuthContext } from "./Contexts/authContext";


console.log = function no_console() {
};


const ProtectedRoute = ({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode; }) => {
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
}

export default App;
