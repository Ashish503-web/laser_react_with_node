import './App.css';
import Login from './login/login.js';
import Dashboard from './Dashboard/dashboard.js';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return <Navigate to="/" replace state={{ from: "expired" }} />;
    }

    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>

      {/* ✅ Toast container is global */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
