import React from "react";

// Navbar component displaying app title and subtitle
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>Peer Tutoring Matchmaker</h1>
        <p className="navbar-subtitle">Helping students connect with peer tutors</p>
      </div>
    </nav>
  );
};

export default Navbar;
