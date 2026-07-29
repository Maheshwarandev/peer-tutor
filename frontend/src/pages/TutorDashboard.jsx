import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RequestList from "../components/RequestList";
import { fetchOpenRequests } from "../services/api";

const TutorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOpenRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchOpenRequests();
      setRequests(response.data || []);
    } catch (err) {
      setError("Unable to load open help requests. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpenRequests();
  }, []);

  return (
    <div>
      <Navbar showBackHome={true} />

      <main className="container">
        <div className="dashboard-header">
          <h1>Tutor Dashboard</h1>
          <p className="dashboard-description">
            Browse available help requests and accept one by entering your name.
          </p>
        </div>

        <RequestList
          requests={requests}
          loading={loading}
          error={error}
          onRefresh={loadOpenRequests}
        />
      </main>
    </div>
  );
};

export default TutorDashboard;
