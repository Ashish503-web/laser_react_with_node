import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login/login";
import DashboardLayout from "./Layout/dashboardLayout.js";
import Dashboard from "./Dashboard/dashboard.js";
import Orders from "./order/order.js";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Stocks from "./stocks/stocks.js";
import Categories from "./category/category.js";
import 'primeicons/primeicons.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
