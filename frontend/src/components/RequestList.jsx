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

      {/* Empty state */}
      {!loading && !error && requests.length === 0 && (
        <div className="empty-state">No Open Help Requests</div>
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
