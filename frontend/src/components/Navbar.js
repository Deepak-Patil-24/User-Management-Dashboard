import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark navbar-custom mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          User Dashboard
        </Link>

        <div className="navbar-nav flex-row">
          {user ? (
            <>
              <Link className="nav-link me-3" to="/dashboard">
                Home
              </Link>
              <Link className="nav-link me-3" to="/products">
                Products
              </Link>
              <Link className="nav-link me-3" to="/profile">
                Profile
              </Link>
              <button
                className="nav-link btn btn-link text-light"
                onClick={handleLogout}
                style={{ border: "none", background: "none" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link me-3" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
