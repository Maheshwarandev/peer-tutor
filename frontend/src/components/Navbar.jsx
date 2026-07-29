import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ showBackHome = false }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="brand-logo-link">
            <h1>🎓 Peer Tutoring Matchmaker</h1>
          </Link>
          <p className="navbar-subtitle">Helping students learn together through peer tutoring</p>
        </div>

        {showBackHome && (
          <Link to="/" className="navbar-back-btn">
            ← Back to Home
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
