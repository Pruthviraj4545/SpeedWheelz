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

- <img width="1907" height="909" alt="Screenshot 2026-04-09 131054" src="https://github.com/user-attachments/assets/8e8368a3-2cb1-41b4-93f7-d8bde9a0b518" />
<img width="1907" height="912" alt="Screenshot 2026-04-09 131041" src="https://github.com/user-attachments/assets/e2e094f4-c94f-4a2f-8b70-bf7b06fc6723" />
<img width="1905" height="914" alt="Screenshot 2026-04-09 130952" src="https://github.com/user-attachments/assets/a1d8b04f-2d82-4619-9a37-ddb60289ab91" />
<img width="1906" height="913" alt="Screenshot 2026-04-09 131029" src="https://github.com/user-attachments/assets/5e58f620-5e12-4215-a594-2ebab2664265" />
<img width="1907" height="918" alt="Screenshot 2026-04-09 130936" src="https://github.com/user-attachments/assets/fbc1473d-19e1-4cfb-a6e2-731d2b91f67e" />
<img width="1895" height="914" alt="Screenshot 2026-04-09 130918" src="https://github.com/user-attachments/assets/2bc00ff1-23f3-4904-8231-1965189b4a60" />
<img width="1909" height="909" alt="Screenshot 2026-04-09 130944" src="https://github.com/user-attachments/assets/e3bc1161-da14-4da2-b0aa-0048c08c8749" />

