const express = require("express");
const router = express.Router();

const {
  createRequest,
  getOpenRequests,
  getAllRequests,
  matchTutor,
} = require("../controllers/requestController");

// POST /api/requests
router.get("/", getAllRequests);
router.get("/open", getOpenRequests);
router.post("/", createRequest);
router.patch("/:id/match", matchTutor);

module.exports = router;