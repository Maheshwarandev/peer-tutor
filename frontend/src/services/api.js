import axios from "axios";

// Reusable Axios instance configured with backend API base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all open help requests (GET /api/requests/open)
export const fetchOpenRequests = async () => {
  const response = await API.get("/requests/open");
  return response.data;
};

// Create a new help request (POST /api/requests)
export const createHelpRequest = async (requestData) => {
  const response = await API.post("/requests", requestData);
  return response.data;
};

// Match a tutor to a request (PATCH /api/requests/:id/match)
export const matchTutorRequest = async (id, tutorName) => {
  const response = await API.patch(`/requests/${id}/match`, {
    tutor_name: tutorName,
  });
  return response.data;
};

export default API;
