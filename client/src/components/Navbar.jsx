 import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // <-- Import this
import { Link } from "react-router-dom"; // use Link instead of <a href>

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // <-- Use auth state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="overflow-y-auto sticky top-0 z-50">
      <nav className="bg-secondary m-4 rounded-3xl shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">

          {/* Logo */}
          <span className="text-3xl font-bold cursor-pointer text-primary hover:tracking-widest hover:scale-125 transition-all duration-200">
            ToolNode
          </span>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-secondary focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Links */}
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-accent">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="block py-2 px-3 rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Feed
                </Link>
              </li>

              {isAuthenticated && (
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-3 rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Profile
                  </Link>
                </li>
              )}

              {!isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-3 rounded bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-3 rounded bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 rounded text-red-600 border border-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
