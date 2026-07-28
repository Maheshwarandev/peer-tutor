import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RequestForm from "../components/RequestForm";
import RequestList from "../components/RequestList";
import { fetchOpenRequests } from "../services/api";

// Home Page Layout & API State Manager
const Home = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch open requests from backend (GET /api/requests/open)
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

  // Task 2: Fetch open requests on initial component mount using useEffect
  useEffect(() => {
    loadOpenRequests();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container">
        {/* Help Request Creation Form */}
        <RequestForm onRequestCreated={loadOpenRequests} />

        {/* Open Requests List */}
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

export default Home;
