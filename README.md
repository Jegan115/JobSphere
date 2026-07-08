# 💼 JobSphere

> A modern full-stack MERN Job Portal connecting job seekers with employers through a secure, scalable, and intuitive platform.

![JobSphere Banner](./assets/banner.png)

---

## 🚀 Overview

JobSphere is a full-stack job portal built using the MERN Stack that enables employers to post jobs and manage applicants while allowing job seekers to search, save, and apply for jobs seamlessly.

Designed with scalability, security, and modern UI principles, JobSphere provides a complete recruitment ecosystem.

---

## ✨ Features

### 👤 Authentication
- User Registration & Login
- JWT Authentication
- Password Encryption (bcrypt)
- Role-Based Authorization
- Persistent Login

### 💼 Job Management
- Post New Jobs
- Edit/Delete Jobs
- Search Jobs
- Filter by Location, Skills & Category
- Save Jobs

### 🏢 Company Management
- Company Profile
- Company Logo Upload
- Company Dashboard

### 📄 Applications
- Apply for Jobs
- Resume Upload
- Track Application Status
- Employer Applicant Management

### 📊 Dashboards
- Job Seeker Dashboard
- Employer Dashboard
- Admin Dashboard

### 🔔 Advanced Features
- Real-Time Notifications
- Responsive Design
- Dark/Light Theme
- Profile Management
- Secure REST APIs

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- Framer Motion
- React Hook Form

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary

---

# 📂 Project Structure

```
JobSphere
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── redux
│   │   ├── routes
│   │   ├── services
│   │   ├── hooks
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/JobSphere.git

cd JobSphere
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

## Jobs

```
GET     /api/jobs
GET     /api/jobs/:id
POST    /api/jobs
PUT     /api/jobs/:id
DELETE  /api/jobs/:id
```

## Companies

```
GET     /api/company
POST    /api/company
PUT     /api/company/:id
```

## Applications

```
POST    /api/application/:jobId
GET     /api/application
DELETE  /api/application/:id
```

---

# 🔐 Authentication Flow

```
User
    │
Register/Login
    │
JWT Generated
    │
Stored in Client
    │
Protected Routes
    │
Authorized APIs
```

---

# 📸 Screenshots

### Home Page

(Add Screenshot)

### Login

(Add Screenshot)

### Employer Dashboard

(Add Screenshot)

### Job Listings

(Add Screenshot)

---

# 🚀 Future Enhancements

- AI Resume Matching
- Resume Score Analyzer
- Interview Scheduler
- Real-Time Chat
- Video Interviews
- Google Authentication
- GitHub Authentication
- Email Verification
- Two-Factor Authentication
- Mobile App

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Jegan N**

Founder of **Starknetics**

GitHub: https://github.com/Jegan115

---

# ⭐ Support

If you like this project,

⭐ Star the repository

🍴 Fork the repository

📢 Share it with others

---

## Made with ❤️ using the MERN Stack.
