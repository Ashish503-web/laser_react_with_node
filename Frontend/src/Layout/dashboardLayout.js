import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

const DashboardLayout = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);
     const navigate = useNavigate();
     const location = useLocation();

     const handleLogout = () => {
          localStorage.removeItem("access_token");
          navigate("/", { replace: true });
     };

     const menuItems = [
          { label: "Dashboard", icon: "🏠", path: "/dashboard" },
          { label: "Orders", icon: "📦", path: "/orders" }
     ];

     return (
          <div className="flex h-screen">
               {/* Sidebar */}
               <aside
                    className={clsx(
                         "bg-gradient-to-b from-green-dark to-primary text-white transition-all duration-300 flex flex-col",
                         sidebarOpen ? "w-64" : "w-20"
                    )}
               >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/20">
                         {sidebarOpen && <h2 className="text-lg font-bold">MyApp</h2>}
                         <button
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              className="p-2 hover:bg-white/20 rounded"
                         >
                              ☰
                         </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 mt-4">
                         <ul className="space-y-1">
                              {menuItems.map((item) => (
                                   <li
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={clsx(
                                             "flex items-center gap-3 px-4 py-3 cursor-pointer rounded transition hover:bg-white hover:text-green-dark",
                                             location.pathname === item.path && "bg-white text-green-dark"
                                        )}
                                   >
                                        <span className="text-lg">{item.icon}</span>
                                        {sidebarOpen && <span className="font-medium">{item.label}</span>}
                                   </li>
                              ))}
                         </ul>
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/20">
                         <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-red-500 transition"
                         >
                              🚪
                              {sidebarOpen && <span>Logout</span>}
                         </button>
                    </div>
               </aside>

               {/* Main Content */}
               <div className="flex flex-col flex-1">
                    {/* Header */}
                    <header className="flex items-center justify-between bg-teal-light px-6 py-4 shadow-md">
                         <h1 className="text-xl font-bold">
                              {location.pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
                         </h1>
                         <button
                              onClick={handleLogout}
                              className="text-xl font-bold">
                              Logout
                         </button>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto bg-slate-light">
                         <Outlet />
                    </main>
               </div>
          </div>
     );
};

export default DashboardLayout;
