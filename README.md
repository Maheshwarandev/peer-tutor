# Peer Tutoring Matchmaker

A full-stack web application designed to connect students needing academic assistance with peer tutors. Built using **Node.js**, **Express.js**, **PostgreSQL**, **React (Vite)**, **React Router**, and **Axios**.

---

## 📌 Project Overview & Application Workflow

The **Peer Tutoring Matchmaker** application facilitates peer-to-peer academic support through a multi-page workflow driven by React Router:

### **Application Architecture Flow**
```text
Landing Page ( / )
  ├── 📚 "I Need Help"
  │     ↓
  │   Student Dashboard ( /student )
  │     ↓
  │   POST /api/requests  (Submits new help request)
  │
  └── 👨‍🏫 "I Want to Help"
        ↓
      Tutor Dashboard ( /tutor )
        ↓
      GET /api/requests/open  (Fetches available open requests)
        ↓
      PATCH /api/requests/:id/match  (Accepts request & assigns tutor)
```

1. **Landing Page (`/`)**: Displays a clean, professional welcome screen with two primary action cards:
   * **📚 I Need Help**: Directs students to the Student Dashboard.
   * **👨‍🏫 I Want to Help**: Directs tutors to the Tutor Dashboard.
2. **Student Dashboard (`/student`)**: Students submit a help request specifying their name, subject, and topic. Displays success feedback and offers a "Back to Home" option.
3. **Tutor Dashboard (`/tutor`)**: Peer tutors view all open help requests (`WHERE status = 'Open'`), enter their name, and click "Accept Request". The request status updates to `Matched` in PostgreSQL and automatically refreshes off the open list.

---

## 🛠️ Tech Stack

### **Backend (Unchanged)**
* **Runtime & Framework**: Node.js & Express.js (v5)
* **Database**: PostgreSQL (connected using `pg` Pool driver)
* **Configuration**: `dotenv` for environment variables, `cors` for Cross-Origin Resource Sharing
* **Dev Tools**: `nodemon` for hot-reloading

### **Frontend**
* **Framework**: React 19 (built with Vite)
* **Routing**: React Router (`react-router-dom` v7)
* **HTTP Client**: Axios
* **Styling**: Clean custom CSS (spacious 900px centered CRUD assessment layout, rectangular inputs/buttons, no UI frameworks)

---

## 📁 Repository Structure

```text
peer_tutor/
│
├── backend/                  # Node.js + Express API Server
│   ├── config/
│   │   └── db.js             # PostgreSQL connection pool configuration
│   ├── controllers/
│   │   └── requestController.js # API request handling and SQL queries
│   ├── routes/
│   │   └── requestRoutes.js  # Express routes definition (/api/requests)
│   ├── .env                  # Environment variables (DB credentials, Port)
│   ├── package.json          # Backend dependencies & scripts
│   └── server.js             # Express app entrypoint & server setup
│
├── frontend/                 # React Single Page Application
│   ├── public/               # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation header with "Home" link
│   │   │   ├── RequestForm.jsx # Help request submission form (Student Section)
│   │   │   ├── RequestList.jsx # Available open requests list (Tutor Section)
│   │   │   ├── RequestCard.jsx # Request card displaying subject/topic & badge
│   │   │   └── MatchTutor.jsx  # Tutor name input & "Accept Request" action button
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Landing page (Route: /)
│   │   │   ├── StudentDashboard.jsx# Student Dashboard (Route: /student)
│   │   │   └── TutorDashboard.jsx  # Tutor Dashboard (Route: /tutor)
│   │   ├── services/
│   │   │   └── api.js        # Centralized Axios API instance (http://localhost:5000/api)
│   │   ├── styles/
│   │   │   └── styles.css    # Custom responsive CSS stylesheet
│   │   ├── App.jsx           # Application root configuring React Router
│   │   └── main.jsx          # React DOM mounting entrypoint
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite build configuration
│
├── FRONTEND.txt              # Frontend documentation & complete source code
└── README.md                 # Complete project documentation
```

---

## 🗄️ Database Setup (PostgreSQL)

Before running the backend, create the database and table using PostgreSQL (`psql` or pgAdmin):

```sql
-- 1. Create Database
CREATE DATABASE peer_tutoring_db;

-- Connect to the database
\c peer_tutoring_db;

-- 2. Create help_requests Table
CREATE TABLE help_requests (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    topic TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Open',
    tutor_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body / Params | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Health check | None | `200 OK` — Plain text status |
| `POST` | `/api/requests` | Create a new help request | `{ "student_name": "Alice", "subject": "Math", "topic": "Calculus" }` | `201 Created` — Created request object |
| `GET` | `/api/requests` | Fetch all requests | None | `200 OK` — `{ count: N, data: [...] }` |
| `GET` | `/api/requests/open` | Fetch requests with `status = 'Open'` | None | `200 OK` — `{ count: N, data: [...] }` |
| `PATCH` | `/api/requests/:id/match` | Accept/match a tutor to a request | Params: `:id`<br>Body: `{ "tutor_name": "Bob" }` | `200 OK` — Updated request object |

---

## 🚀 Setup & Running Instructions

### **1. Backend Setup**
1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_NAME=peer_tutoring_db
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   * Server runs on **`http://localhost:5000`**.

---

### **2. Frontend Setup**
1. Open a new terminal and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   * Application runs on **`http://localhost:5173`**.

---

## 🧪 QA Testing & Verification

The backend has undergone a full QA test audit covering 20 test scenarios (positive tests, negative validation, malformed JSON, SQL injection safety, non-numeric route parameters, and state concurrency checks) with a **100% Pass Rate**.
