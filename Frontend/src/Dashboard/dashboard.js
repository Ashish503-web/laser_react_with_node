import React from "react";

const Dashboard = () => {

  const token = localStorage.getItem('access_token');


  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Welcome to Dashboard!
        this is your token{token}
      </h1>
    </div>
  );
};

export default Dashboard;
