import React from "react";
import Navbar from "../components/Navbar";
import RequestForm from "../components/RequestForm";

// Student Dashboard Component (Route: /student)
const StudentDashboard = () => {
  return (
    <div>
      <Navbar showBackHome={true} />

      <main className="container">
        {/* Page Header */}
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p className="dashboard-description">Create a help request.</p>
        </div>

        {/* Request Creation Form */}
        <RequestForm />
      </main>
    </div>
  );
};

export default StudentDashboard;
