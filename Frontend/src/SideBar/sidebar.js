import React from "react";
import { Sidebar } from "primereact/sidebar";

export default function SideBar({ visible, setVisible }) {
  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      className="bg-gradient-to-b from-green-dark to-primary text-white w-64"
    >
      <ul className="space-y-2 mt-6">
        <li className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-white hover:text-green-dark transition">
          <span className="text-lg">🏠</span>
          <span className="font-medium">Home</span>
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-orange-dark transition">
          <span className="text-lg">📊</span>
          <span className="font-medium">Reports</span>
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-red-dark transition">
          <span className="text-lg">⚙️</span>
          <span className="font-medium">Settings</span>
        </li>
      </ul>
    </Sidebar>
  );
}
