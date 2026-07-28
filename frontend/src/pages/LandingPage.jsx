import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Landing Page Component (Route: /)
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar showBackHome={false} />

      <main className="container">
        {/* Landing Hero Header */}
        <div className="landing-hero">
          <h1>Peer Tutoring Matchmaker</h1>
          <p className="landing-subtitle">
            Helping students learn together through peer tutoring.
          </p>
        </div>

        {/* Action Cards Container */}
        <div className="action-cards-grid">
          {/* Card 1: Student Option */}
          <div className="action-card">
            <div className="action-card-icon">📚</div>
            <h2>I Need Help</h2>
            <p>Submit a request to get help from another student.</p>
            <button
              onClick={() => navigate("/student")}
              className="btn-blue btn-full"
            >
              Continue
            </button>
          </div>

          {/* Card 2: Tutor Option */}
          <div className="action-card">
            <div className="action-card-icon">👨‍🏫</div>
            <h2>I Want to Help</h2>
            <p>Browse open requests and help another student.</p>
            <button
              onClick={() => navigate("/tutor")}
              className="btn-blue btn-full"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
