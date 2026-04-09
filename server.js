const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/carServiceDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ========== Static Data ==========
const services = [
  { id: 1, name: 'Oil Change' },
  { id: 2, name: 'Car Wash' },
  { id: 3, name: 'Full Service' },
  { id: 4, name: 'Tire Rotation' },
  { id: 5, name: 'Brake Inspection' },
  { id: 6, name: 'AC Service' },
  { id: 7, name: 'Battery Check' },
  { id: 8, name: 'Engine Tune-Up' },
  { id: 9, name: 'Wheel Alignment' },
  { id: 10, name: 'Interior Detailing' }
];

const carBrands = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Kia',
  'Toyota', 'Honda', 'MG', 'Skoda', 'Volkswagen',
  'Renault', 'Nissan', 'Jeep', 'Citroen', 'BMW',
  'Mercedes-Benz', 'Audi', 'Ford', 'Chevrolet', 'Other'
];

// Available time slots: 10AM to 6PM, skip 1PM-2PM (lunch break), hourly
const allTimeSlots = [
  '10:00', '11:00', '12:00',
  // 1:00 PM - 2:00 PM is lunch break
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

// ========== API Routes ==========

// GET /services
app.get('/services', (req, res) => {
  res.json(services);
});

// GET /carbrands
app.get('/carbrands', (req, res) => {
  res.json(carBrands);
});

// GET /timeslots?date=YYYY-MM-DD — get available time slots for a date
app.get('/timeslots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    // Find all appointments on that date
    const bookedAppointments = await Appointment.find({ date });
    const bookedSlots = bookedAppointments.map(a => a.time);

    // Get current date/time in IST
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);
    const todayIST = istNow.toISOString().split('T')[0];
    const currentHour = istNow.getUTCHours();
    const currentMinute = istNow.getUTCMinutes();

    const available = allTimeSlots.filter(slot => {
      // Remove already booked slots
      if (bookedSlots.includes(slot)) return false;

      // If selected date is today, only show future slots
      if (date === todayIST) {
        const [slotH, slotM] = slot.split(':').map(Number);
        if (slotH < currentHour || (slotH === currentHour && slotM <= currentMinute)) {
          return false;
        }
      }

      return true;
    });

    res.json({ allSlots: allTimeSlots, availableSlots: available, bookedSlots });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch time slots' });
  }
});

// GET /appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST /appointments
app.post('/appointments', async (req, res) => {
  try {
    const { name, phone, carBrand, carModel, service, date, time } = req.body;

    if (!name || !phone || !carBrand || !carModel || !service || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if slot is already booked
    const existing = await Appointment.findOne({ date, time });
    if (existing) {
      return res.status(409).json({ error: 'This time slot is already booked. Please choose another.' });
    }

    // Validate time is in allowed slots
    if (!allTimeSlots.includes(time)) {
      return res.status(400).json({ error: 'Invalid time slot selected.' });
    }

    const appointment = new Appointment({ name, phone, carBrand, carModel, service, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// DELETE /appointments/:id
app.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// Serve pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/book', (req, res) => res.sendFile(path.join(__dirname, 'public', 'book.html')));
app.get('/appointments-page', (req, res) => res.sendFile(path.join(__dirname, 'public', 'appointments.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// Start server
app.listen(PORT, () => {
  console.log(`🚗 Server running at http://localhost:${PORT}`);
});
