import React from "react";
import RequestCard from "./RequestCard";

// Component for rendering the list of open help requests
const RequestList = ({ requests, loading, error, onRefresh }) => {
  return (
    <div className="card">
      <h3>Available Help Requests</h3>

      {/* Loading state */}
      {loading && <div className="loading-state">Loading help requests...</div>}

      {/* Error state */}
      {!loading && error && <div className="alert alert-error">{error}</div>}

      {/* Empty state with friendly feedback message */}
      {!loading && !error && requests.length === 0 && (
        <div className="empty-state">
          <p style={{ fontWeight: 600, color: "#111827", marginBottom: "4px" }}>
            🎉 All caught up! No open help requests right now.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
            Check back later to see when new students request assistance.
          </p>
        </div>
      )}

      {/* List of open request cards */}
      {!loading && !error && requests.length > 0 && (
        <div className="requests-grid">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onMatched={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;
