import React, { useState } from "react";
import { matchTutorRequest } from "../services/api";

const MatchTutor = ({ requestId, onMatched }) => {
  const [tutorName, setTutorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleMatch = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!tutorName.trim()) {
      setError("Please enter your name.");
      return;
    }

    try {
      setLoading(true);

      await matchTutorRequest(requestId, tutorName.trim());

      setSuccess("Tutor assigned successfully.");
      setTutorName("");

      if (onMatched) {
        onMatched();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to assign tutor.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleMatch} className="match-container">
        <input
          type="text"
          placeholder="Your Name"
          value={tutorName}
          onChange={(e) => setTutorName(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn-blue" disabled={loading}>
          {loading ? "Accepting..." : "Accept Request"}
        </button>
      </form>
    </div>
  );
};

export default MatchTutor;
