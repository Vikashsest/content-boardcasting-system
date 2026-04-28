# 📚 Content Broadcasting System (Backend)

## 🚀 Overview

This project is a **Content Broadcasting System** built using **Node.js (Express)** and **PostgreSQL (Cloud Hosted)**.

It enables:

- Teachers to upload subject-based content (notes, announcements, etc.)
- Principal to approve or reject content
- Students to access **live broadcasted content** via public APIs

---

## 🛠 Tech Stack

- Backend: Node.js, Express
- Database: PostgreSQL (Cloud Hosted)
- ORM: Sequelize
- Authentication: JWT
- File Upload: Multer
- Password Hashing: bcrypt

---

## 📁 Folder Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 ├── middlewares/
 ├── utils/
```

---

## 🔐 Authentication & RBAC

- JWT-based authentication implemented
- Role-based access control (RBAC)

### Roles:

- **Teacher**
- **Principal**

### Permissions:

| Role      | Access                               |
| --------- | ------------------------------------ |
| Teacher   | Upload content, view own content     |
| Principal | View pending content, approve/reject |

---

## 📤 Content Upload

### Required Fields:

- Title
- Subject
- File

### Optional Fields:

- Description
- Start Time
- End Time
- Rotation Duration (default: 5 minutes)

### Supported Formats:

- JPG, PNG, GIF

### File Size Limit:

- Max 10MB

---

## 🔄 Content Lifecycle

```
uploaded → pending → approved / rejected
```

- Pending → waiting for principal approval
- Approved → eligible for broadcasting
- Rejected → includes rejection reason

---

## 🧑‍💼 Approval Workflow

- Only **Principal** can:
  - Approve content
  - Reject content (with reason)

---

## 📡 Public Broadcasting APIs

### Endpoints:

```
GET /content/live/:teacherId
GET /content/live/:teacherId/:subject
```

### Behavior:

- Returns only **approved content**
- Applies:
  - Time window (start_time & end_time)
  - Subject filtering (if provided)
  - Rotation logic

### Response:

- Active content OR empty response if none available

---

## ⏱ Scheduling & Rotation Logic (IMPORTANT)

### Rules:

- Content is active only if:
  - current_time >= start_time
  - current_time <= end_time

- Each content has its own rotation duration

### Example:

| Content | Duration |
| ------- | -------- |
| A       | 5 min    |
| B       | 10 min   |
| C       | 3 min    |

### Rotation Flow:

```
A → 0–5
B → 5–15
C → 15–18
(loop continues)
```

### Logic:

- Total duration of all contents is calculated
- Current time is taken modulo total duration
- Active content is selected based on timeline

---

## 📌 API Endpoints

### 🔑 Auth

```
POST /auth/login
```

---

### 👤 User

```
GET /users/currentUser
```

---

### 👨‍🏫 Teacher

```
POST /content/upload
GET /content/mycontent
```

---

### 👨‍💼 Principal

```
GET /content/pendingcontent
PATCH /content/approve/:id
PATCH /content/:id/reject
GET /content
```

---

### 🌍 Public APIs

```
GET /content/live/:teacherId
GET /content/live/:teacherId/:subject
```

---

### ⏲ Scheduling

```
POST /content/schedule
```

---

## ⚠️ Edge Cases

- No content → empty response
- Approved but outside time window → not shown
- Invalid subject → empty response
- No active content → returns null

---

## ☁️ Database Setup (Cloud Hosted)

The database is hosted on a **cloud PostgreSQL service** for better accessibility and deployment.

### Environment Variables

Create a `.env` file:

```
DB_URI=your_cloud_database_url
JWT_SECRET=your_secret_key
PORT=3000
```

> ⚠️ Credentials are not exposed for security reasons.

---

## ▶️ Run Locally

```
git clone <your-repo-link>
cd project
npm install
```

### Setup `.env`

```
DB_URI=your_cloud_db_url
JWT_SECRET=your_secret
PORT=3000
```

### Start Server

```
npm run dev
```

---

##📡 API Documentation (Swagger)

Swagger UI is available at:

http://localhost:3000/api-docs

## 🌐 Deployment

- Backend deployed on: **Render**
- Database hosted on: **Cloud PostgreSQL**

---

---

## 🌍 Live API

👉 https://your-backend-url

---

## 🧠 Assumptions

- Users (Teacher/Principal) are pre-created
- Content without start_time/end_time is not active
- Rotation is based on `rotation_duration`

---

## 📈 Future Improvements

- Redis caching for `/content/live`
- AWS S3 file storage
- Analytics dashboard

---

## 📌 Conclusion

This project demonstrates:

- Clean backend architecture
- Proper RBAC implementation
- Real-world scheduling logic
- Scalable backend design

---

✅ Assignment requirements completed
