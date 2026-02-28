import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {

  const navigate = useNavigate();

  const { dark, setDark } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">
          InterviewPro
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/practice"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Practice
          </Link>

          <Link
            to="/history"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            History
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            Profile
          </Link>

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded hover:bg-gray-200 
                       dark:hover:bg-gray-700"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600"
          >
            <FaSignOutAlt size={18} />
          </button>

        </div>

      </div>
    </nav>
  );
}
