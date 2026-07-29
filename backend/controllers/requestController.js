const pool = require("../config/db");

// Create a new help request
const createRequest = async (req, res) => {
  try {
    const { student_name, subject, topic } = req.body || {};

    if (!student_name || !subject || !topic) {
      return res.status(400).json({
        message: "student_name, subject and topic are required",
      });
    }

    // Logic Rule 1: A student cannot submit a help request for a subject if they already have an 'Open' request for that exact same subject
    const checkSubjectQuery = `
      SELECT * FROM help_requests 
      WHERE LOWER(student_name) = LOWER($1) 
        AND LOWER(subject) = LOWER($2) 
        AND status = 'Open';
    `;
    const checkSubjectResult = await pool.query(checkSubjectQuery, [
      student_name.trim(),
      subject.trim(),
    ]);

    if (checkSubjectResult.rows.length > 0) {
      return res.status(409).json({
        message: "You already have an open help request for this subject.",
      });
    }

    const query = `
      INSERT INTO help_requests (student_name, subject, topic)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [student_name.trim(), subject.trim(), topic.trim()];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Help request created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating request:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Fetch requests with status = 'Open'
const getOpenRequests = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM help_requests
      WHERE status = 'Open'
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    res.status(200).json({
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching requests:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Fetch all requests
const getAllRequests = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM help_requests
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    res.status(200).json({
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching all requests:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Assign a tutor to a specific help request
const matchTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { tutor_name } = req.body || {};

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid request ID",
      });
    }

    if (!tutor_name || typeof tutor_name !== "string" || tutor_name.trim() === "") {
      return res.status(400).json({
        message: "Tutor name is required",
      });
    }

    const checkQuery = "SELECT * FROM help_requests WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Help request not found",
      });
    }

    if (checkResult.rows[0].status === "Matched") {
      return res.status(409).json({
        message: "Request is already matched",
      });
    }

    const updateQuery = `
      UPDATE help_requests
      SET
        tutor_name = $1,
        status = 'Matched',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [tutor_name.trim(), id]);

    res.status(200).json({
      message: "Tutor matched successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error matching tutor:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createRequest,
  getOpenRequests,
  getAllRequests,
  matchTutor,
};