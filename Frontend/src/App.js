import './App.css';
import Login from './login/login.js';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard/dashboard.js';
import { toast } from "react-toastify";


function App() {

  const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.error("⚠️ Token not found or expired. Please login again.", {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};


  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<Login/>}/>
          
          <Route path="/dashboard" 
          element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          }/>
        </Routes>
      </Router>
      <Login/>
       <ToastContainer />
    </div>
  );
}

export default App;
