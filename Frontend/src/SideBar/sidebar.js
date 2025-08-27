import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";

const SideBar = ({ visible, setVisible }) => {
  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      className="bg-gradient-to-b from-green-dark to-primary text-white w-64"
    >
      <ul className="space-y-2 mt-6">
        <li className="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-white hover:text-green-dark transition">
          <span className="text-lg">🏠</span>
          <Link to="/" className="font-medium">Home</Link>
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white hover:text-blue-dark transition">
          <span className="text-lg">🛒</span>
          <Link to="/orders" className="font-medium">Orders</Link>
        </li>

       
      </ul>
    </Sidebar>
  );
}

export default SideBar;
