import React from "react";
import MatchTutor from "./MatchTutor";

// Component representing an individual request card
const RequestCard = ({ request, onMatched }) => {
  const { id, student_name, subject, topic, status } = request;

  return (
    <div className="request-card">
      <div className="request-card-header">
        <h4>{student_name}</h4>
        {/* Status badge */}
        <span className="badge-open">{status || "Open"}</span>
      </div>

      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Topic:</strong> {topic}</p>

      {/* Inline Tutor Match Form */}
      <MatchTutor requestId={id} onMatched={onMatched} />
    </div>
  );
};

export default RequestCard;
