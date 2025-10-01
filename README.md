# Scalable Web App 🚀

A fullstack MERN (MongoDB, Express, React, Node.js) application with user authentication (JWT) and a task manager dashboard.  
Frontend is built with **React + Vite + TailwindCSS** and deployed on **Vercel**.  
Backend is built with **Express + MongoDB (Mongoose)** and can be deployed on **Render / Railway / Heroku**.  

---

## 📂 Project Structure

Scalable-Web-App/
│── backend/ # Node.js + Express + MongoDB API
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes (auth, tasks)
│ ├── server.js # Backend entry point
│ └── .env # Environment variables
│
│── frontend/ # React + Vite client
│ ├── src/ # Pages, components, API utils
│ ├── public/
│ └── vite.config.js
│
└── README.md # Documentation


---

## ⚙️ Tech Stack

**Frontend:** React, Vite, TailwindCSS  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT  
**Deployment:** Vercel (frontend), Render/Railway/Heroku (backend)  

---

## 🔑 Features

- 🔐 User Signup & Login with **JWT authentication**  
- 🔑 Passwords secured using **bcrypt**  
- 🚫 Protected Dashboard route (only logged-in users can access)  
- ✅ Task Manager (Add/Delete tasks, persisted in MongoDB)  
- 🌍 CORS-configured backend for cross-origin communication  

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/roshanamancha17/Scalable-Web-App.git
cd Scalable-Web-App
