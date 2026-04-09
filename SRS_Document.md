# Software Requirements Specification (SRS)
## Car Service Appointment Booking System - SpeedWheelz Auto Care

**Version:** 1.0  
**Date:** April 6, 2026  
**Project:** Car Service Appointment Booking System  
**Business Name:** SpeedWheelz Auto Care  
**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose, HTML/CSS/JavaScript

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [System Architecture](#5-system-architecture)
6. [Database Design](#6-database-design)
7. [API Specifications](#7-api-specifications)
8. [User Interface Design](#8-user-interface-design)
9. [User Roles & Permissions](#9-user-roles--permissions)
10. [Business Rules](#10-business-rules)
11. [Performance Requirements](#11-performance-requirements)
12. [Security Requirements](#12-security-requirements)
13. [Error Handling & Logging](#13-error-handling--logging)
14. [Deployment & Infrastructure](#14-deployment--infrastructure)
15. [Testing Strategy](#15-testing-strategy)
16. [Future Enhancements](#16-future-enhancements)
17. [Glossary](#17-glossary)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the **SpeedWheelz Auto Care** - an online car service appointment booking system. The system enables customers to book car service appointments online, view/manage their appointments, and allows administrators to manage bookings.

### 1.2 Scope
The system is a full-stack web application consisting of:
- **Backend:** RESTful API built with Node.js and Express.js
- **Database:** MongoDB for persistent storage
- **Frontend:** Single-page application with multiple views (Home, Book Appointment, Appointments, Contact)
- **Features:** Service browsing, appointment booking with time slot management, appointment viewing/cancellation, and contact functionality

### 1.3 Target Users
- **Customers:** Car owners who want to book and manage service appointments
- **Administrators:** Service center staff who manage appointments (view all bookings)
- **Business:** SpeedWheelz Auto Care service center

### 1.4 Definitions, Acronyms, and Abbreviations
- **SRS:** Software Requirements Specification
- **REST:** Representational State Transfer
- **API:** Application Programming Interface
- **MVC:** Model-View-Controller
- **CRUD:** Create, Read, Update, Delete
- **OEM:** Original Equipment Manufacturer
- **IST:** Indian Standard Time
- **UI:** User Interface
- **UX:** User Experience

---

## 2. System Overview

### 2.1 Product Perspective
The SpeedWheelz Auto Care booking system is a standalone web application that operates as a self-service portal for car service appointments. It integrates directly with MongoDB for data persistence and serves multiple HTML pages through Express.js static file serving.

### 2.2 Product Functions
- Display available car services and company information
- Allow customers to book appointments with date and time selection
- Show real-time available time slots for selected dates
- Enable appointment viewing and cancellation
- Provide contact information and company details
- Responsive design for mobile and desktop users

### 2.3 User Characteristics
- **Technical Level:** Basic computer and internet literacy
- **Age Range:** 18-65 years
- **Devices:** Desktop, laptop, tablet, or smartphone with web browser
- **Language:** English (primary)

---

## 3. Functional Requirements

### 3.1 User Authentication & Access
**FR-001:** The system shall allow anonymous access to all public pages (Home, Book, Appointments, Contact) without authentication.

**FR-002:** No user login/registration is required for booking appointments.

### 3.2 Home Page
**FR-003:** The system shall display a landing/home page containing:
- Company branding (SpeedWheelz Auto Care)
- Hero section with call-to-action buttons
- Statistics display (Cars serviced, services offered, rating, etc.)
- List of available services with icons and descriptions
- "Why Choose Us" section highlighting business benefits
- Customer testimonials
- Navigation menu to all pages

**FR-004:** Navigation shall work across all pages via a responsive navbar.

### 3.3 Services
**FR-005:** The system shall maintain a list of available services with:
- Service name
- Icon/visual identifier (Font Awesome icons)
- Description
- Duration (display purposes only)

**FR-006:** Available services include:
1. Car Servicing (Full inspection, tune-up)
2. Oil Change (Engine oil and filter replacement)
3. Engine Diagnostics (Advanced scanning)
4. Wheel Alignment (Precision alignment)
5. Car Wash (Exterior and interior cleaning)
6. Tire Rotation
7. Brake Inspection
8. AC Service
9. Battery Check
10. Engine Tune-Up
11. Full Service
12. Interior Detailing

**FR-007:** The service list shall be fetched via API endpoint and displayed dynamically.

### 3.4 Car Brands
**FR-008:** The system shall provide a dropdown list of car brands for selection during booking:
- Maruti Suzuki, Hyundai, Tata, Mahindra, Kia, Toyota, Honda, MG, Skoda, Volkswagen, Renault, Nissan, Jeep, Citroen, BMW, Mercedes-Benz, Audi, Ford, Chevrolet, Other

**FR-009:** Users shall also provide a specific car model name.

### 3.5 Appointment Booking
**FR-010:** The booking form shall collect the following mandatory fields:
- Customer full name (text, max 100 chars)
- Phone number (10-digit numeric validation)
- Car brand (dropdown selection)
- Car model (text input)
- Service type (dropdown from available services)
- Appointment date (date input with minimum = today)
- Appointment time (selected from available time slots)

**FR-011:** The system shall validate:
- All fields are required before submission
- Phone number must be exactly 10 digits
- Selected date cannot be in the past
- Selected date cannot be Sunday (business closed)
- Selected time slot must be from available slots

**FR-012:** Upon date selection, the system shall:
- Fetch available time slots for that date
- Display time slots in a grid layout
- Show booked slots as disabled
- Prevent booking lunch break (1:00 PM - 2:00 PM)
- Only show slots from current time onward if date is today

**FR-013:** Available time slots (24-hour format): 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00

**FR-014:** The system shall display a confirmation modal with booking details upon successful submission.

### 3.6 Appointment Management - Viewing
**FR-015:** The system shall display all booked appointments in a separate page with:
- Customer name
- Phone number
- Car brand and model
- Service type
- Appointment date (DD/MM/YYYY format)
- Appointment time (12-hour format with AM/PM)
- Status badge (Today, Upcoming, Past)
- Cancel button (only for future appointments)

**FR-016:** The system shall provide search/filter functionality:
- Text search across name, car model, service, car brand
- Filter by: All, Today, Upcoming, Past

**FR-017:** The system shall automatically calculate appointment status based on date/time.

### 3.7 Appointment Cancellation
**FR-018:** Users shall be able to cancel appointments via a confirmation modal.

**FR-019:** The system shall require double confirmation before deletion.

**FR-020:** Past appointments shall have a disabled cancel button.

**FR-021:** Upon successful cancellation, the system shall refresh the appointment list and show a success toast.

### 3.8 Contact Page
**FR-022:** The system shall display contact information:
- Company address
- Phone numbers (2 numbers)
- Email addresses (2 addresses)
- Business hours
- Google Maps embed

**FR-023:** The system shall provide a contact form with:
- Name (required)
- Email (required, format validation)
- Subject (required)
- Message (required, textarea)

**FR-024:** Contact form submissions shall show a success message (frontend-only, no backend persisted).

### 3.9 Responsive Design
**FR-025:** The system shall be fully responsive across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (<768px)

**FR-026:** The navigation menu shall collapse to a hamburger menu on mobile devices.

---

## 4. Non-Functional Requirements

### 4.1 Performance
**NFR-001:** Page load time shall be under 3 seconds on standard broadband connection.

**NFR-002:** API response time shall be under 500ms for 95% of requests.

**NFR-003:** The system shall support up to 100 concurrent users without degradation.

**NFR-004:** Database queries shall use appropriate indexes for fast retrieval.

### 4.2 Availability
**NFR-005:** The system shall be available 24/7 except for scheduled maintenance.

**NFR-006:** MongoDB connection shall handle automatic reconnection on failures.

**NFR-007:** The application shall gracefully handle server errors and display user-friendly messages.

### 4.3 Reliability
**NFR-008:** The system shall maintain data integrity - no appointment data loss.

**NFR-009:** Database operations shall be atomic (either complete successfully or fail without partial updates).

**NFR-010:** The compound index on (date, time) shall prevent duplicate bookings.

### 4.4 Maintainability
**NFR-011:** Code shall follow consistent formatting and organization.

**NFR-012:** Separation of concerns: Models, routes, and views shall be modular.

**NFR-013:** Environment configuration shall be externalizable (port, DB URL).

### 4.5 Usability
**NFR-014:** The user interface shall be intuitive requiring no training.

**NFR-015:** Form validation messages shall be clear and helpful.

**NFR-016:** Success/error feedback shall be displayed within 1 second of user action.

**NFR-017:** Users shall be able to complete booking in under 2 minutes.

### 4.6 Scalability
**NFR-018:** The architecture shall support horizontal scaling of the Node.js server.

**NFR-019:** Database schema shall be designed for potential future enhancements (customer accounts, notifications, payments).

---

## 5. System Architecture

### 5.1 Architecture Diagram (Textual)

```
┌─────────────────┐
│   User Browser  │
│   (HTML/CSS/JS) │
└────────┬────────┘
         │ HTTP/HTTPS
         ▼
┌─────────────────────────────────────┐
│   Express.js Server (Node.js)       │
│   ┌─────────────────────────────┐   │
│   │  Route Handlers             │   │
│   │  - GET /services            │   │
│   │  - GET /carbrands           │   │
│   │  - GET /timeslots           │   │
│   │  - GET /appointments        │   │
│   │  - POST /appointments       │   │
│   │  - DELETE /appointments/:id │   │
│   └─────────────┬───────────────┘   │
│                 │                   │
│   ┌─────────────▼───────────────┐   │
│   │  Mongoose Models            │   │
│   │  - Appointment              │   │
│   └─────────────┬───────────────┘   │
│                 │                   │
│   ┌─────────────▼───────────────┐   │
│   │  MongoDB Database           │   │
│   │  - carServiceDB             │   │
│   │    └─ appointments          │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 5.2 Technology Stack
- **Runtime:** Node.js v14+
- **Web Framework:** Express.js v4.18.2
- **Database:** MongoDB
- **ODM:** Mongoose v7.6.3
- **CORS:** cors v2.8.5
- **Dev Tool:** nodemon v3.0.1
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Icons:** Font Awesome 6.4.0
- **Animations:** AOS (Animate On Scroll) library

### 5.3 Data Flow
1. User requests page → Express serves static HTML file
2. Browser executes client-side JavaScript
3. JavaScript makes fetch requests to API endpoints
4. Express route handlers validate and process requests
5. Mongoose interacts with MongoDB
6. Results returned as JSON to frontend
7. Frontend dynamically updates UI based on response

---

## 6. Database Design

### 6.1 Database Name
`carServiceDB`

### 6.2 Collection: appointments

#### 6.2.1 Schema Definition

```javascript
{
  _id: ObjectId,               // Auto-generated primary key
  name: String,                // Customer name (required, trimmed)
  phone: String,               // Phone number (required, trimmed)
  carBrand: String,            // Car brand (required, trimmed)
  carModel: String,            // Car model (required, trimmed)
  service: String,             // Service type (required, trimmed)
  date: String,                // Appointment date YYYY-MM-DD (required)
  time: String,                // Appointment time HH:MM (24hr format, required)
  createdAt: Date,             // Auto-generated timestamp
  updatedAt: Date              // Auto-generated timestamp
}
```

#### 6.2.2 Indexes
- **Compound Unique Index:** `{ date: 1, time: 1 }` - Enforces one appointment per time slot
- **Default Indexes:** `_id` (automatic), `createdAt`, `updatedAt`

#### 6.2.3 Constraints
- All fields are required (no nullable fields)
- `name`, `phone`, `carBrand`, `carModel`, `service` have `trim: true` to remove whitespace
- Duplicate booking prevention at database level via unique compound index

---

## 7. API Specifications

### 7.1 Base URL
`http://localhost:3000`

### 7.2 Endpoints

#### 7.2.1 GET /services
**Purpose:** Retrieve list of available services

**Request:**
- Method: GET
- Headers: None
- Query Parameters: None
- Body: None

**Response:**
- Status: 200 OK
- Content-Type: application/json
- Body:
```json
[
  { "id": 1, "name": "Oil Change" },
  { "id": 2, "name": "Car Wash" },
  { "id": 3, "name": "Full Service" },
  { "id": 4, "name": "Tire Rotation" },
  { "id": 5, "name": "Brake Inspection" },
  { "id": 6, "name": "AC Service" },
  { "id": 7, "name": "Battery Check" },
  { "id": 8, "name": "Engine Tune-Up" },
  { "id": 9, "name": "Wheel Alignment" },
  { "id": 10, "name": "Interior Detailing" }
]
```

#### 7.2.2 GET /carbrands
**Purpose:** Retrieve list of car brands

**Request:**
- Method: GET
- Headers: None
- Query Parameters: None
- Body: None

**Response:**
- Status: 200 OK
- Content-Type: application/json
- Body:
```json
[
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia",
  "Toyota", "Honda", "MG", "Skoda", "Volkswagen",
  "Renault", "Nissan", "Jeep", "Citroen", "BMW",
  "Mercedes-Benz", "Audi", "Ford", "Chevrolet", "Other"
]
```

#### 7.2.3 GET /timeslots?date=YYYY-MM-DD
**Purpose:** Get available time slots for a specific date

**Request:**
- Method: GET
- Query Parameters:
  - `date` (required, string): Date in YYYY-MM-DD format

**Response 200:**
```json
{
  "allSlots": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  "availableSlots": ["10:00", "11:00", "15:00", "16:00", "17:00"],
  "bookedSlots": ["12:00", "13:00", "14:00"]
}
```

**Response 400 (Bad Request):**
```json
{
  "error": "Date is required"
}
```

**Response 500 (Server Error):**
```json
{
  "error": "Failed to fetch time slots"
}
```

**Business Logic:**
- Filters out already booked slots for the given date
- If query date is today, removes past time slots (before current IST time)
- Returns all configured slots, available slots, and booked slots
- Always excludes lunch break slot (13:00 - 14:00 not in allSlots)

#### 7.2.4 GET /appointments
**Purpose:** Retrieve all appointments sorted by date and time

**Request:**
- Method: GET
- Headers: None
- Query Parameters: None
- Body: None

**Response 200:**
```json
[
  {
    "_id": "660a1b2c3d4e5f6a7b8c9d0e",
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "carBrand": "Hyundai",
    "carModel": "Creta",
    "service": "Oil Change",
    "date": "2026-04-10",
    "time": "10:00",
    "createdAt": "2026-04-06T10:30:00.000Z",
    "updatedAt": "2026-04-06T10:30:00.000Z"
  }
]
```

**Response 500:**
```json
{
  "error": "Failed to fetch appointments"
}
```

**Sorting:** Results sorted by `date` ascending, then `time` ascending

#### 7.2.5 POST /appointments
**Purpose:** Create a new appointment booking

**Request:**
- Method: POST
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "carBrand": "Hyundai",
  "carModel": "Creta",
  "service": "Oil Change",
  "date": "2026-04-10",
  "time": "10:00"
}
```

**Field Validation:**
- All fields required (400 if missing)
- `time` must be in allowed slots (10:00-17:00, excluding 13:00)

**Response 201 (Created):**
- Returns created appointment object with `_id` and timestamps

**Response 400 (Bad Request):**
```json
{
  "error": "All fields are required"
}
```
OR
```json
{
  "error": "Invalid time slot selected."
}
```

**Response 409 (Conflict):**
```json
{
  "error": "This time slot is already booked. Please choose another."
}
```

**Response 500:**
```json
{
  "error": "Failed to create appointment"
}
```

**Business Logic:**
1. Validates all required fields present
2. Checks if time slot is in allowed slots
3. Checks for existing appointment with same (date, time) combination
4. If valid, creates and saves appointment

#### 7.2.6 DELETE /appointments/:id
**Purpose:** Cancel/delete an appointment

**Request:**
- Method: DELETE
- Path Parameters:
  - `id` (required): MongoDB ObjectId of appointment

**Response 200:**
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Response 404 (Not Found):**
```json
{
  "error": "Appointment not found"
}
```

**Response 500:**
```json
{
  "error": "Failed to delete appointment"
}
```

### 7.3 Static File Serving
Express.js serves static files from `public/` directory:
- `/` → `public/index.html`
- `/book` → `public/book.html`
- `/appointments-page` → `public/appointments.html`
- `/contact` → `public/contact.html`
- `/style.css` → `public/style.css`
- `/script.js` → `public/script.js`

---

## 8. User Interface Design

### 8.1 Navigation Structure
```
Main Navigation (visible on all pages):
├── Home (/)
├── Book Appointment (/book)
├── Appointments (/appointments-page)
└── Contact (/contact)

Mobile: Hamburger menu toggles navigation links
```

### 8.2 Pages

#### 8.2.1 Home Page (index.html)
**Layout:**
- Fixed navbar with logo and navigation
- Hero section with headline and CTA buttons
- Statistics row (4 columns)
- Services grid section (up to 6 services)
- "Why Choose Us" section (4 feature cards)
- Customer testimonials (3 reviews)
- Footer with links and contact info

**Features:**
- Animated entrance effects (CSS animations)
- Counter animation on stats
- AOS (Animate On Scroll) library integration
- Book Now buttons redirect to booking page

#### 8.2.2 Book Appointment Page (book.html)
**Layout (2-column on desktop, stacked on mobile):**
- Left column: Booking info panel (business hours, guarantees, trust badges)
- Right column: Booking form card

**Form Fields:**
1. Full Name (text, required)
2. Phone Number (tel, 10-digit, required)
3. Car Brand (dropdown, required)
4. Car Model (text, required)
5. Service Type (dropdown populated from API, required)
6. Appointment Date (date, min=today, required)
7. Time Slot Selection (grid of clickable buttons, displayed after date selection)

**Time Slot Display:**
- Grid of 8 time slots (10:00 AM - 5:00 PM)
- Visual states: Available (white), Selected (amber), Booked (gray/red)
- Lunch break notice (1-2 PM)
- No slots available message when all are booked

**Success States:**
- Confetti animation on successful booking
- Success modal with booking details
- Form reset

#### 8.2.3 Appointments Page (appointments.html)
**Layout:**
- Header section
- Controls bar (search input + filter dropdown)
- Appointments grid/stack

**Appointment Card Display:**
- Service icon
- Service type (badge)
- Customer name
- Phone number
- Car brand + model
- Date and time
- Status badge: Today / Upcoming / Past
- Cancel button (only if upcoming/today)

**Features:**
- Real-time search as you type
- Filter by status (All/Today/Upcoming/Past)
- Modal confirmation before cancellation
- Loading states with spinner overlay
- Empty state message when no appointments

#### 8.2.4 Contact Page (contact.html)
**Layout (2-column on desktop):**
- Contact info grid (4 cards: address, phone, email, hours)
- Contact form card
- Google Maps embed

**Contact Form Fields:**
1. Name (text, required)
2. Email (email type, required)
3. Subject (text, required)
4. Message (textarea, required)

**Note:** Form submission shows success toast only (no backend API - demo only)

#### 8.2.5 Shared UI Components
- **Navbar:** Fixed position, backdrop blur on scroll, responsive toggle
- **Footer:** Multi-column with quick links, services list, contact info
- **Toasts:** Right-aligned notifications (success/error)
- **Spinner:** Full-screen overlay loading indicator
- **Modals:** Centered dialogs for confirmation and success states
- **Back-to-top button:** Fixed position, appears after scrolling

### 8.3 Color Scheme
- **Primary/Accent:** Amber `#f59e0b` (buttons, highlights, icons)
- **Background (dark):** `#0a0a0f` (home page), `#0d1421` (cards)
- **Background (light):** `#f0f2f5` (booking/appointments pages)
- **Text (dark):** `#0d1b2a`, `#1b2d4f`
- **Text (light):** `#ffffff` (for dark backgrounds)
- **Text (muted):** `#94a3b8`, `#cbd5e1`, `#6b7280`
- **Success:** Green `#065f46`, `#22c55e`
- **Error:** Red `#e63946`, `#ef4444`
- **Borders:** `#e2e8f0`, `#1e293b`, `#334155`

### 8.4 Typography
- **Font Family:** Inter (body), Bebas Neue (headings on home page)
- **Base font size:** 16px
- **Heading sizes:** 1.2rem - 2.8rem
- **Responsive scaling:** Font sizes adjust for mobile

---

## 9. User Roles & Permissions

### 9.1 Roles
The system currently has **two logical roles** but no authentication:

1. **Anonymous Customer**
   - Can view all pages
   - Can book new appointments
   - Can view all appointments (no filtering by user)
   - Can cancel own appointments (no way to distinguish between users)
   - Can contact via form

2. **Administrator** (implicit)
   - Same interface as customer
   - Can view all appointments in the system
   - Can cancel any appointment
   - No special permissions or separate login

### 9.2 Access Control
- All pages are publicly accessible
- No session management
- No user-specific data isolation
- **Note:** This is a proof-of-concept implementation; production would require authentication

---

## 10. Business Rules

### 10.1 Operating Hours
- **Days Open:** Monday - Saturday
- **Closed:** Sunday
- **Hours:** 10:00 AM - 6:00 PM IST
- **Lunch Break:** 1:00 PM - 2:00 PM (no appointments during this hour)

### 10.2 Appointment Rules
1. **One appointment per time slot:** No double-booking allowed (enforced by database unique index)
2. **Advance booking:** Customers can book appointments for any future date
3. **Minimum notice:** Can book for today, but only future time slots (no past slots)
4. **Cancellation:** Free cancellation allowed at any time before appointment
5. **Time slot granularity:** 1-hour slots only (10, 11, 12, 13, 14, 15, 16, 17 in 24hr format)
6. **Duration:** Each slot is 1 hour; assumes service completes within slot

### 10.3 Validation Rules
- **Phone:** Exactly 10 digits, numeric only
- **Name/Car Model/Service:** Required, no max length enforced (relies on trim)
- **Date:** Must be today or later, not a Sunday
- **Time:** Must be from available slots list
- **Car Brand:** Must be from predefined list

### 10.4 Data Retention
- Appointments remain in database indefinitely
- No automatic cleanup of past appointments
- Manual deletion only via cancel operation

---

## 11. Performance Requirements

### 11.1 Response Times
| Operation | Target Response Time | Acceptable Maximum |
|-----------|---------------------|--------------------|
| Page load (HTML) | < 1 second | 3 seconds |
| API GET requests | < 200ms | 500ms |
| API POST requests | < 300ms | 800ms |
| API DELETE requests | < 250ms | 600ms |
| Database queries | < 100ms | 300ms |

### 11.2 Throughput
- Concurrent users: 100+ simultaneous users
- Requests per second: 50+ RPS
- Database connections: Connection pooling enabled (default in Mongoose)

### 11.3 Scalability Considerations
- Stateless Node.js server allows horizontal scaling
- MongoDB can be scaled via replica sets or sharding
- API responses are lightweight JSON
- Static assets (CSS, JS) are cached by browser

---

## 12. Security Requirements

### 12.1 Current Implementation Level: **LOW** (Development/Prototype)

**WARNING:** This section describes security gaps. Production deployment requires addressing all items in Section 12.5.

### 12.2 Implemented Security
- **CORS:** Enabled with default settings (allows all origins)
- **Input Validation:** Frontend HTML5 validation + basic backend checks
- **MongoDB Injection:** Mongoose ORM prevents NoSQL injection
- **XSS Prevention:** No user input rendered as HTML (all treated as text)

### 12.3 Not Implemented (Production Required)

#### 12.3.1 Authentication & Authorization
- No user authentication mechanism
- No role-based access control
- No session management
- All users have identical permissions

#### 12.3.2 HTTPS
- Development assumes HTTP
- Production requires TLS/SSL encryption

#### 12.3.3 Rate Limiting
- No request throttling
- Vulnerable to brute force or DoS attacks

#### 12.3.4 Input Sanitization
- No sanitization library (e.g., Joi, express-validator)
- Relies on basic validation
- Potential for injection attacks in edge cases

#### 12.3.5 CSRF Protection
- No CSRF tokens
- State-changing operations (POST/DELETE) vulnerable to CSRF

#### 12.3.6 Sensitive Data
- Phone numbers stored in plaintext
- No encryption at rest
- No PII protection measures

#### 12.3.7 API Security
- No API keys or rate limiting
- All endpoints publicly accessible
- No request logging for audit

#### 12.3.8 Error Handling
- Error messages may leak stack traces in development
- Generic errors shown to users (good), but no centralized logging

### 12.4 Security Best Practices (Production Checklist)
- [ ] Configure CORS with specific allowed origins
- [ ] Implement user authentication (e.g., JWT, sessions)
- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Use HTTPS in production
- [ ] Add input validation library (Joi, Yup, express-validator)
- [ ] Implement CSRF protection (csurf)
- [ ] Configure security headers (helmet middleware)
- [ ] Sanitize user inputs (DOMPurify on frontend, validator on backend)
- [ ] Encrypt sensitive PII at rest
- [ ] Set up audit logging
- [ ] Implement request logging (morgan)
- [ ] Configure MongoDB authentication
- [ ] Regular dependency vulnerability scanning (npm audit)

### 12.5 OWASP Top 10 Coverage Assessment

| Risk | Status | Notes |
|------|--------|-------|
| A01:2021 - Broken Access Control | ❌ HIGH | No authentication, all endpoints public |
| A02:2021 - Cryptographic Failures | ❌ HIGH | PII stored in plaintext, no HTTPS |
| A03:2021 - Injection | ⚠️ MEDIUM | Mongoose prevents NoSQL, but no SQL DB; XSS mitigated by text rendering |
| A04:2021 - Insecure Design | ❌ HIGH | No security architecture; trust in client |
| A05:2021 - Security Misconfiguration | ❌ HIGH | Default Express config, verbose errors |
| A06:2021 - Vulnerable Components | ⚠️ MEDIUM | Need npm audit; regular updates required |
| A07:2021 - Authentication Failures | ❌ HIGH | No authentication at all |
| A08:2021 - Data Integrity Failures | ❌ HIGH | No integrity checks on data |
| A09:2021 - Security Logging & Monitoring | ❌ HIGH | No logging, no monitoring |
| A10:2021 - Server-Side Request Forgery | ⚠️ LOW | No user-supplied URLs, but potential if features added |

---

## 13. Error Handling & Logging

### 13.1 Error Response Format
All API errors return JSON:
```json
{
  "error": "Human-readable error message"
}
```

### 13.2 HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success (GET) |
| 201 | Success (POST) |
| 400 | Bad Request (missing/invalid fields) |
| 404 | Not Found (appointment doesn't exist) |
| 409 | Conflict (time slot already booked) |
| 500 | Internal Server Error |

### 13.3 Frontend Error Handling
- Network errors: Display toast notification
- API errors: Show inline message in form or toast
- Load failures: Show retry option or error state

### 13.4 Logging (Current State)
**Development:** `console.log` and `console.error` used
- Connection success: `✅ Connected to MongoDB`
- Connection error: `❌ MongoDB connection error:`
- Server start: `🚗 Server running at http://localhost:3000`

**Production Requirements:**
- Structured logging (Winston, Pino)
- Log levels: info, warn, error
- Log rotation
- Centralized log aggregation (ELK, Splunk, Datadog)
- Remove console.log from production

### 13.5 Monitoring
- No health check endpoint (future: `/health`)
- No metrics collection (future: Prometheus)
- No alerting configured

---

## 14. Deployment & Infrastructure

### 14.1 Prerequisites
1. **Node.js:** v14+ (recommended: v18 LTS)
2. **MongoDB:** v4.4+ or MongoDB Atlas (cloud)
3. **Operating System:** Any (Linux, Windows, macOS)
4. **Port:** 3000 (default, configurable)

### 14.2 Environment Configuration
**Current State:** Hardcoded values in `server.js`:
```javascript
const PORT = 3000;
mongoose.connect('mongodb://localhost:27017/carServiceDB')
```

**Production Configuration (Recommended):**
```javascript
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carServiceDB';

mongoose.connect(MONGODB_URI)
```

**Required Environment Variables:**
- `PORT` (optional, default: 3000)
- `MONGODB_URI` (required in production)
- `NODE_ENV=production` (for production optimizations)

### 14.3 Installation & Setup

**Step 1: Clone and Install**
```bash
cd Assignment6
npm install
```

**Step 2: Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas connection string in server.js
```

**Step 3: Start Application**
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

**Step 4: Access Application**
- Home: `http://localhost:3000`
- Book: `http://localhost:3000/book`
- Appointments: `http://localhost:3000/appointments-page`
- Contact: `http://localhost:3000/contact`

### 14.4 Production Deployment Options

#### Option A: Traditional VPS/Cloud Server
1. Provision Ubuntu 20.04+ server
2. Install Node.js, MongoDB
3. Clone repository
4. Run `npm ci --only=production`
5. Configure environment variables
6. Use PM2 process manager: `pm2 start server.js`
7. Configure Nginx/Apache reverse proxy
8. Set up SSL (Let's Encrypt)
9. Configure firewall

#### Option B: Platform-as-a-Service (PaaS)
- **Heroku:** Deploy with MongoDB Atlas connection
- **Render.com:** Web service with MongoDB add-on
- **Railway.app:** Simple deployment with managed database
- **Vercel/Netlify:** Not suitable (requires separate backend)

#### Option C: Containerized (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**docker-compose.yml** (with MongoDB):
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/carServiceDB
      - NODE_ENV=production
    depends_on:
      - mongodb
    restart: always

volumes:
  mongodb_data:
```

### 14.5 CI/CD Pipeline (Recommended)
**GitHub Actions Workflow:**
1. On push to main
2. Run tests (if any)
3. Lint code (ESLint)
4. Build Docker image
5. Push to container registry
6. Deploy to staging/production

**Example GitHub Actions:**
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker
        run: |
          docker build -t myapp .
          docker push myapp/ci-image:${{ github.sha }}
```

### 14.6 Monitoring & Maintenance
- **Process Management:** PM2 (process monitor, logs, restarts)
- **Logs:** PM2 logs, or forward to service
- **Metrics:** Application Monitoring (New Relic, Datadog)
- **Uptime:** UptimeRobot, Pingdom
- **Database:** MongoDB Atlas monitoring dashboard
- **Backups:** Daily MongoDB dumps or Atlas snapshots

---

## 15. Testing Strategy

### 15.1 Current State: **NO AUTOMATED TESTS**

**Manual testing performed:**
- Booking flow validation
- Time slot availability logic
- Cancellation workflow
- Responsive design testing across viewports

### 15.2 Recommended Testing Approach

#### 15.2.1 Unit Tests (Backend)
**Framework:** Jest or Mocha + Chai + Sinon

**Test Coverage Required:**
- Appointment model validation
- Time slot algorithm logic
- API route handlers (GET, POST, DELETE)
- Database operations (CRUD)
- Date/time business logic
- Conflict detection

**Example Test Cases:**
```javascript
describe('POST /appointments', () => {
  test('should create appointment with valid data', async () => {
    const res = await request(app)
      .post('/appointments')
      .send(validAppointmentData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  test('should reject duplicate booking', async () => {
    await Appointment.create(validAppointmentData);
    const res = await request(app)
      .post('/appointments')
      .send(validAppointmentData);
    expect(res.status).toBe(409);
  });
});
```

#### 15.2.2 Integration Tests
- API endpoint testing with test database
- Full booking flow: GET /timeslots → POST /appointments → GET /appointments → DELETE
- Error scenarios: 400, 404, 409 responses
- Database integration with in-memory MongoDB (mongodb-memory-server)

#### 15.2.3 Frontend Tests
**Manual Testing Checklist:**
- [ ] Form validation (empty fields, invalid phone)
- [ ] Date picker minimum date enforcement
- [ ] Time slot loading and selection
- [ ] Form submission success/error states
- [ ] Appointment list display and refresh
- [ ] Search and filter functionality
- [ ] Cancel confirmation modal
- [ ] Responsive layout at all breakpoints
- [ ] Navigation to all pages
- [ ] Contact form submission

**Automated UI Tests (Optional):**
- Framework: Cypress or Playwright
- Scenarios to test:
  - Complete booking flow end-to-end
  - Cancel appointment flow
  - Date validation (past dates, Sundays)
  - Responsive breakpoints

#### 15.2.4 Performance Testing
- Load testing with Artillery or k6
- Simulate 50-100 concurrent users
- Measure API response times
- Database query performance
- Stress test for time slot contention

#### 15.2.5 Security Testing
- Static Analysis Security Testing (SAST) with npm audit
- OWASP ZAP or Burp Suite scan
- Input validation testing (SQL/NoSQL injection attempts)
- XSS testing in form fields

---

## 16. Future Enhancements

### 16.1 Phase 2 (High Priority)
1. **User Authentication & Authorization**
   - Customer registration/login
   - Password reset functionality
   - Role-based access (Customer vs Admin)
   - Session management

2. **Email Notifications**
   - Booking confirmation email
   - Appointment reminder (24 hours before)
   - Cancellation notification
   - Email templates with company branding

3. **SMS Notifications**
   - WhatsApp/SMS reminders via Twilio or similar
   - OTP for phone verification

4. **Payment Integration**
   - Online payment collection (Razorpay, Stripe)
   - Service pricing display
   - Payment status tracking
   - Refund handling

5. **Admin Dashboard**
   - Separate admin interface
   - Manage all appointments
   - View analytics/reports
   - Schedule management (block dates, modify hours)

### 16.2 Phase 3 (Medium Priority)
1. **Advanced Booking Features**
   - Recurring appointments (monthly service plans)
   - Multi-service bookings in single appointment
   - Preferred technician selection
   - Service duration tracking
   - Queue management

2. **Customer Portal**
   - User profiles
   - Service history
   - Vehicle management (multiple cars per account)
   - Loyalty program / points

3. **Enhanced UI/UX**
   - Calendar view for appointment selection
   - Drag-and-drop rescheduling
   - Live chat support
   - Progressive Web App (PWA) features

4. **Service Estimates**
   - Pre-booking cost estimates
   - Transparent pricing per service
   - Parts cost tracking
   - Labor hour tracking

### 16.3 Phase 4 (Low Priority)
1. **Multi-location Support**
   - Multiple service center locations
   - Location-based time zones
   - Inter-center transfers

2. **Inventory Management**
   - Parts inventory tracking
   - Automatic reordering
   - Supplier management

3. **Advanced Analytics**
   - Revenue reports
   - Customer retention metrics
   - Peak time analysis
   - Service popularity trends

4. **Integrations**
   - Accounting software (Tally, QuickBooks)
   - CRM system
   - Google Calendar sync
   - Social media integration

5. **Mobile Application**
   - Native iOS/Android apps
   - Push notifications
   - In-app payment

### 16.4 Technical Improvements
1. **Code Quality**
   - Add comprehensive test suite (>80% coverage)
   - Implement TypeScript for type safety
   - Set up ESLint + Prettier
   - Add husky for git hooks

2. **Performance**
   - Implement Redis caching
   - Image optimization and CDN
   - Database query optimization
   - API response compression

3. **DevOps**
   - CI/CD pipeline with tests
   - Blue-green deployments
   - Feature flags
   - Canary releases

4. **Observability**
   - Application Performance Monitoring (APM)
   - Distributed tracing (OpenTelemetry)
   - Structured logging
   - Error tracking (Sentry)
   - Business metrics dashboard

5. **Internationalization**
   - Multi-language support (i18n)
   - Currency localization
   - Date/time format per locale

---

## 17. Glossary

| Term | Definition |
|------|------------|
| **Appointment** | A scheduled booking for car service at a specific date and time |
| **Time Slot** | One-hour interval (10:00-17:00) when services can be booked |
| **SpeedWheelz** | The business name; "SpeedWheelz Auto Care" |
| **Service** | A type of car maintenance or repair offered (Oil Change, Car Wash, etc.) |
| **Booking** | The act of reserving an appointment; synonym for appointment |
| **Mongoose** | MongoDB object modeling tool for Node.js |
| **Express.js** | Web application framework for Node.js |
| **REST API** | Application programming interface using HTTP methods |
| **CRUD** | Create, Read, Update, Delete - basic operations |
| **SRS** | Software Requirements Specification document |
| **OEM** | Original Equipment Manufacturer - genuine parts |
| **IST** | Indian Standard Time (UTC+5:30) |
| **AOS** | Animate On Scroll - frontend animation library |
| **UI** | User Interface - visual design and layout |
| **UX** | User Experience - overall experience using the system |
| **CRUD** | Create, Read, Update, Delete - database operations |
| **ORM/ODM** | Object-Relational/Document Mapper - library to interact with DB |
| **PWA** | Progressive Web App - web app with native-like features |
| **CTR** | Click-Through Rate - marketing metric |
| **KPI** | Key Performance Indicator - measurable value |
| **PII** | Personally Identifiable Information - customer data |
| **OWASP** | Open Web Application Security Project - security standards |
| **TLS/SSL** | Transport Layer Security / Secure Sockets Layer - encryption |
| **CORS** | Cross-Origin Resource Sharing - browser security policy |
| **JWT** | JSON Web Token - authentication standard |
| **CSRF** | Cross-Site Request Forgery - security vulnerability |
| **XSS** | Cross-Site Scripting - security vulnerability |
| **NFT** | NoSQL injection - security vulnerability similar to SQL injection |
| **CI/CD** | Continuous Integration/Continuous Deployment - automation |
| **PM2** | Process manager for Node.js applications |
| **API** | Application Programming Interface |
| **HTTP** | Hypertext Transfer Protocol |
| **HTTPS** | HTTP Secure - encrypted HTTP |
| **JSON** | JavaScript Object Notation - data interchange format |
| **MongoDB** | NoSQL document database |
| **Node.js** | JavaScript runtime for server-side execution |
| **npm** | Node Package Manager - dependency management |
| **REST** | Representational State Transfer - architectural style |
| **SSL** | Secure Sockets Layer - encryption protocol |
| **TLS** | Transport Layer Security - encryption protocol |
| **URI** | Uniform Resource Identifier |
| **URL** | Uniform Resource Locator |
| **UX** | User Experience |
| **UI** | User Interface |
| **VPS** | Virtual Private Server |
| **SSL** | Secure Sockets Layer |

---

## 18. Appendices

### Appendix A: Mockups & Wireframes
*(Not included in this document - refer to separate design files or visual inspection of HTML)*

### Appendix B: Sample Data

**Sample Car Brands (20 total):**
Maruti Suzuki, Hyundai, Tata, Mahindra, Kia, Toyota, Honda, MG, Skoda, Volkswagen, Renault, Nissan, Jeep, Citroen, BMW, Mercedes-Benz, Audi, Ford, Chevrolet, Other

**Sample Appointment:**
```json
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "carBrand": "Hyundai",
  "carModel": "Creta",
  "service": "Oil Change",
  "date": "2026-04-10",
  "time": "10:00"
}
```

**Sample Service:**
```json
{
  "id": 1,
  "name": "Oil Change",
  "icon": "<i class=\"fas fa-oil-can\"></i>",
  "description": "Fresh engine oil and filter replacement for improved performance and longevity.",
  "duration": "30 min"
}
```

### Appendix C: Decision Log

| Decision | Rationale | Date | Alternatives Considered |
|----------|-----------|------|------------------------|
| No authentication | Simplicity for MVP/POC | 2026-04-06 | JWT, Sessions, OAuth |
| Vanilla JS vs Framework | Keep dependencies minimal | 2026-04-06 | React, Vue, Angular |
| MongoDB vs SQL | Schema flexibility | 2026-04-06 | PostgreSQL, MySQL |
| Time slots = 1 hour | Simplifies scheduling | 2026-04-06 | 30min, 90min, custom |
| No payment | Out of scope for MVP | 2026-04-06 | Razorpay, Stripe integration |
| Single service center | Scope management | 2026-04-06 | Multi-location system |
| Phone = 10 digits (India) | Target market is India (Pune) | 2026-04-06 | International format |

### Appendix D: Known Issues & Limitations

1. **No Authentication:** Anyone can view, book, or cancel any appointment
2. **No Email Notifications:** Customers don't receive booking confirmations
3. **Single Location:** Cannot handle multiple service centers
4. **No Pricing:** Service prices not displayed or tracked
5. **No Admin Panel:** Administrators use same interface as customers
6. **No User Accounts:** Cannot track individual customer history
7. **Contact Form Non-Functional:** Form submits but data not saved
8. **No Backup/Restore:** Manual MongoDB dump required
9. **No Audit Trail:** Cannot track who made changes
10. **Time Zone:** Assumes IST; not configurable
11. **Sunday Locked:** Business logic assumes Sunday closed (not configurable)
12. **No Service Durations:** Assumes 1-hour slots for all services
13. **No Capacity:** Cannot handle multiple bays/technicians
14. **No Waitlist:** When all slots booked, no waitlist option
15. **No Reporting:** No built-in reports or analytics
16. **Static Services:** Service list hardcoded (no CRUD for services)
17. **No Validation:** Phone number only client-side validated
18. **CORS:** Allows all origins (development config)
19. **No Rate Limiting:** API vulnerable to abuse
20. **Dependencies:** No security scanning in package.json (npm audit needed)

---

## 19. Approval

This SRS document requires approval from:

- **Product Owner:** ___________________ Date: ___________
- **Technical Lead:** ___________________ Date: ___________
- **QA Lead:** _________________________ Date: ___________
- **Stakeholder:** ______________________ Date: ___________

---

## 20. Revision History

| Version | Date | Author | Changes | Approved By |
|---------|------|--------|---------|-------------|
| 1.0 | 2026-04-06 | Claude Code | Initial SRS creation | - |

---

## Document End

**Total Pages:** 25+ (markdown)  
**Prepared By:** Claude Code (Anthropic)  
**Review Status:** Pending  
**Next Review Date:** N/A (initial version)  
**Distribution:** Project Team, Stakeholders
