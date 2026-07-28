import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RequestList from "../components/RequestList";
import { fetchOpenRequests } from "../services/api";

// Tutor Dashboard Component (Route: /tutor)
const TutorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to load open requests from backend
  const loadOpenRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchOpenRequests();
      // Backend returns { count: N, data: [...] }
      setRequests(response.data || []);
    } catch (err) {
      console.error("Failed to fetch open requests:", err);
      setError("Unable to load open help requests. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch open requests on mount
  useEffect(() => {
    loadOpenRequests();
  }, []);

  return (
    <div>
      <Navbar showBackHome={true} />

      <main className="container">
        {/* Page Header */}
        <div className="dashboard-header">
          <h1>Tutor Dashboard</h1>
          <p className="dashboard-description">
            Browse available help requests and accept one by entering your name.
          </p>
        </div>

        {/* Available Open Help Requests List */}
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
