import React, { useState } from "react";
import SideBar from "../SideBar/sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-teal-light text-black px-6 py-4 shadow-md">
        {/* Left - Menu Button */}
        <button
          onClick={() => setSidebarVisible(true)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          ☰ Menu
        </button>

        {/* Center - Welcome */}
        <h1 className="text-xl font-bold text-center flex-1">
          Welcome to Dashboard 🎉
        </h1>

        {/* Right - Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* ✅ Sidebar */}
      <SideBar visible={sidebarVisible} setVisible={setSidebarVisible} />

      {/* ✅ Main Content */}
      <main className="flex-1 p-6">
        <p>Your token: {token ? "✅ Valid session" : "❌ No token"}</p>
      </main>
    </div>
  );
};

export default Dashboard;
