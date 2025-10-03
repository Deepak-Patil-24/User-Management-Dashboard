import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card card-custom">
          <div className="card-body">
            <h1 className="mb-4">Your Profile</h1>

            <div className="mb-3">
              <strong>Name:</strong> {user?.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user?.email}
            </div>

            <Link to="/dashboard" className="btn btn-custom">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
