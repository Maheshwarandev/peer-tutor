import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createHelpRequest } from "../services/api";

const RequestForm = ({ onRequestCreated }) => {
  const [studentName, setStudentName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!studentName.trim() || !subject.trim() || !topic.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await createHelpRequest({
        student_name: studentName.trim(),
        subject: subject.trim(),
        topic: topic.trim(),
      });

      setSuccess("Help request created successfully.");
      setStudentName("");
      setSubject("");
      setTopic("");

      if (onRequestCreated) {
        onRequestCreated();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create help request.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Create Help Request</h3>

      {error && <div className="alert alert-error">{error}</div>}

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
