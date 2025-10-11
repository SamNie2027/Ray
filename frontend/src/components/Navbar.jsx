import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/goals", label: "Goals" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/causes", label: "Causes" },
    { to: "/donations", label: "Donations" },
    { to: "/organizations", label: "Organizations" },
  ];

  return (
    <nav className="bg-transparent fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div>
          <Link to="/" className="text-white sub-heading">
            <img
              src="/logo.png"
              className="w-14"
            />
          </Link>
        </div>

        {/* Middle: Nav Links */}
        {user ? (
            <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `text-gray-700 hover:text-gray-600 font-medium ${
                            isActive ? "border-b-2 border-gray-600" : ""
                            }`
                        }
                        >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        ): null}

        {/* Right: Auth Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="font-medium text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-[#BF5334] hover:bg-[#9F3010] px-4 py-2 rounded-xl font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">
                {user.name || user.username || "User"}
              </span>
              <button
                onClick={signOut}
                className="text-white bg-[#BF5334] hover:bg-[#9F3010] px-4 py-2 rounded-xl font-medium"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
