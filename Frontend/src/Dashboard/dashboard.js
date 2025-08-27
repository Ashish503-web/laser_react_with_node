
const Dashboard = () => {
  const token = localStorage.getItem("access_token");

  return (
    
    <div className="flex text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard 🎉</h2>
      <p>Your token: {token ? "✅ Valid session" : "❌ No token"}</p>
    </div>
  );
};

export default Dashboard;
