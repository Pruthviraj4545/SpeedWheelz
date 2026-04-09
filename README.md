# 🚗 Car Service Appointment Booking System

A simple web application to book car service appointments. Built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and vanilla **HTML/CSS/JavaScript**.

## 📁 Folder Structure

```
Assignment6/
├── models/
│   └── Appointment.js      # Mongoose schema
├── public/
│   ├── index.html           # Frontend HTML
│   ├── style.css            # Styles
│   └── script.js            # Frontend logic (fetch API)
├── server.js                # Express server with REST APIs
├── package.json             # Dependencies
└── README.md                # Instructions
```

## 🗄️ Database

**MongoDB** collection: `appointments`

| Field    | Type   | Description         |
|----------|--------|---------------------|
| name     | String | Customer name       |
| phone    | String | Phone number        |
| carModel | String | Car model           |
| service  | String | Selected service    |
| date     | String | Appointment date    |
| time     | String | Appointment time    |

## ⚙️ API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/services`          | Get list of services     |
| GET    | `/appointments`      | Get all appointments     |
| POST   | `/appointments`      | Book a new appointment   |
| DELETE | `/appointments/:id`  | Cancel an appointment    |

## 🚀 How to Run

### Prerequisites
- **Node.js** (v14+) installed
- **MongoDB** running locally on `mongodb://localhost:27017`

### Steps

1. **Navigate to the project folder:**
   ```bash
   cd Assignment6
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Or with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 👤 Features

- ✅ View available car services
- ✅ Book appointment (name, phone, car model, service, date, time)
- ✅ View all booked appointments
- ✅ Cancel (delete) an appointment
- ✅ Responsive design
- ❌ No login/authentication required

## ⚡ Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Frontend:** HTML, CSS, JavaScript (vanilla)
