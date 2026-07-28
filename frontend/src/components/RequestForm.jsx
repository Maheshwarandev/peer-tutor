import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createHelpRequest } from "../services/api";

// Component for creating help requests in Student Dashboard
const RequestForm = ({ onRequestCreated }) => {
  // State for form fields
  const [studentName, setStudentName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  // State for feedback and loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate empty fields
    if (!studentName.trim() || !subject.trim() || !topic.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Call backend API POST /api/requests
      await createHelpRequest({
        student_name: studentName.trim(),
        subject: subject.trim(),
        topic: topic.trim(),
      });

      // Show success feedback
      setSuccess("Help request created successfully.");

      // Clear input fields
      setStudentName("");
      setSubject("");
      setTopic("");

      // Trigger refresh callback if provided
      if (onRequestCreated) {
        onRequestCreated();
      }
    } catch (err) {
      console.error("Error creating request:", err);
      const msg = err.response?.data?.message || "Failed to create help request.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Create Help Request</h3>

      {/* Error notification */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Success notification with Back to Home button */}
      {success && (
        <div className="alert alert-success alert-with-action">
          <span>{success}</span>
          <Link to="/" className="btn-success-action">
            Back to Home
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            id="studentName"
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            placeholder="Enter subject (e.g., Math)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <textarea
            id="topic"
            placeholder="Describe topic"
            rows="3"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-blue" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
