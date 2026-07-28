# Peer Tutoring Matchmaker

A full-stack web application designed to connect students needing academic assistance with peer tutors. Built using **Node.js**, **Express.js**, **PostgreSQL**, **React (Vite)**, and **Axios**.

---

## 📌 Project Overview

The **Peer Tutoring Matchmaker** application facilitates peer-to-peer academic support:
1. **Student Section**: Students submit a help request specifying their name, the subject, and the specific topic they need help with.
2. **Tutor Section**: Peer tutors view all currently open help requests, enter their name, and accept requests to tutor students.
3. **Automated Matching & Lifecycle**: Once a tutor accepts a request, its status updates from `Open` to `Matched` in PostgreSQL, automatically removing it from the available requests list.

---

## 🛠️ Tech Stack

### **Backend**
* **Runtime & Framework**: Node.js & Express.js (v5)
* **Database**: PostgreSQL (connected using `pg` Pool driver)
* **Configuration**: `dotenv` for environment variables, `cors` for Cross-Origin Resource Sharing
* **Dev Tools**: `nodemon` for hot-reloading

### **Frontend**
* **Framework**: React 19 (built with Vite)
* **HTTP Client**: Axios
* **Styling**: Clean custom CSS (no heavy UI frameworks, responsive 900px centered CRUD layout)

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
│   │   │   ├── Navbar.jsx    # Navigation header & subtitle
│   │   │   ├── RequestForm.jsx # Help request submission form (Student Section)
│   │   │   ├── RequestList.jsx # Available open requests list (Tutor Section)
│   │   │   ├── RequestCard.jsx # Individual request card displaying subject/topic
│   │   │   └── MatchTutor.jsx  # Tutor name input & "Accept Request" action button
│   │   ├── pages/
│   │   │   └── Home.jsx      # Main application page layout
│   │   ├── services/
│   │   │   └── api.js        # Centralized Axios API instance (http://localhost:5000/api)
│   │   ├── styles/
│   │   │   └── styles.css    # Custom responsive CSS stylesheet
│   │   ├── App.jsx           # Root React application component
│   │   └── main.jsx          # React DOM mounting entrypoint
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite build configuration
│
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

### **API Validation & Error Handling**
* **400 Bad Request**: Returned if required fields (`student_name`, `subject`, `topic`, or `tutor_name`) are missing/empty, or if `:id` is non-numeric.
* **404 Not Found**: Returned if the request ID does not exist.
* **409 Conflict**: Returned if attempting to match an already matched request (`status = 'Matched'`).

---

## 🚀 Setup & Running Instructions

### **1. Prerequisites**
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [PostgreSQL](https://www.postgresql.org/) (v14+ recommended)

### **2. Backend Setup**
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
   # Development mode with Nodemon
   npm run dev

   # Or production mode
   npm start
   ```
   * The server will start on **`http://localhost:5000`**.

---

### **3. Frontend Setup**
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
   * The application will open on **`http://localhost:5173`**.

---

## 🧪 QA Testing & Verification

The backend has undergone a full QA test audit covering 20 test scenarios (positive tests, negative validation, malformed JSON, SQL injection safety, non-numeric route parameters, and state concurrency checks) with a **100% Pass Rate**.

---

## 📄 License

This project is licensed under the ISC License.
