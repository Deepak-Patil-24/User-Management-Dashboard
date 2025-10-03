import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="card card-custom mb-4">
        <div className="card-body">
          <h1>Welcome, {user?.name}!</h1>
          <p className="text-muted">
            This is your dashboard. You can manage your products from here.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card card-custom h-100">
            <div className="card-body text-center">
              <h3>Products</h3>
              <p>Create, view, edit and delete your products</p>
              <Link to="/products" className="btn btn-custom">
                Manage Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card card-custom h-100">
            <div className="card-body text-center">
              <h3>Profile</h3>
              <p>View and manage your profile information</p>
              <Link to="/profile" className="btn btn-outline-secondary">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
