import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { name: "Search", path: "/search" },
    { name: "Create Group", path: "/create" },
  ];

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-lg">
            My Nearby Groups
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={toggleNav}
            className="md:hidden text-gray-300 hover:text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-white bg-blue-500 px-3 py-1 rounded"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-white bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
