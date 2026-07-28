const pool = require("../config/db");

const createRequest = async (req, res) => {
  try {
    // Get data from request body
    const { student_name, subject, topic } = req.body || {};


      if (!student_name || !subject || !topic) {
      return res.status(400).json({
        message: "student_name, subject and topic are required",
      });
    }


    // SQL Query
    const query = `
      INSERT INTO help_requests (student_name, subject, topic)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    // Values for placeholders
    const values = [student_name, subject, topic];

    // Execute query
    const result = await pool.query(query, values);

    // Send success response
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


const matchTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { tutor_name } = req.body || {};


      // Validate request ID
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid request ID",
      });
    }



    // Validate empty tutor_name
    if (!tutor_name || typeof tutor_name !== "string" || tutor_name.trim() === "") {
      return res.status(400).json({
        message: "Tutor name is required",
      });
    }

    // Check if request exists
    const checkQuery = "SELECT * FROM help_requests WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Help request not found",
      });
    }

    // Check if already matched
    if (checkResult.rows[0].status === "Matched") {
      return res.status(409).json({
        message: "Request is already matched",
      });
    }

    // Update request
    const updateQuery = `
      UPDATE help_requests
      SET
        tutor_name = $1,
        status = 'Matched',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [tutor_name, id]);

    res.status(200).json({
      message: "Tutor matched successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error.message);

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