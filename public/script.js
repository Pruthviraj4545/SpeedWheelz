const API_URL = 'http://localhost:3000';

// ========== Load Services into Dropdown ==========
async function loadServices() {
  try {
    const res = await fetch(`${API_URL}/services`);
    const services = await res.json();
    const select = document.getElementById('service');

    services.forEach(s => {
      const option = document.createElement('option');
      option.value = s.name;
      option.textContent = `${s.name} - ₹${s.price}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error loading services:', err);
  }
}

// ========== Load All Appointments ==========
async function loadAppointments() {
  const container = document.getElementById('appointmentsList');
  container.innerHTML = '<p class="loading">Loading appointments...</p>';

  try {
    const res = await fetch(`${API_URL}/appointments`);
    const appointments = await res.json();

    if (appointments.length === 0) {
      container.innerHTML = '<p class="no-appointments">No appointments booked yet.</p>';
      return;
    }

    container.innerHTML = '';
    appointments.forEach(apt => {
      const card = document.createElement('div');
      card.className = 'appointment-card';
      card.innerHTML = `
        <div class="appointment-info">
          <h3>${apt.name}</h3>
          <p><i class="fas fa-phone"></i> <span>${apt.phone}</span></p>
          <p><i class="fas fa-car"></i> <span>${apt.carModel}</span></p>
          <p><i class="fas fa-tools"></i> <span>${apt.service}</span></p>
          <p><i class="fas fa-calendar"></i> <span>${apt.date}</span> &nbsp; <i class="fas fa-clock"></i> <span>${apt.time}</span></p>
        </div>
        <button class="btn btn-danger" onclick="deleteAppointment('${apt._id}')">Cancel</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p class="no-appointments">Failed to load appointments.</p>';
    console.error('Error loading appointments:', err);
  }
}

// ========== Book Appointment ==========
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    carModel: document.getElementById('carModel').value.trim(),
    service: document.getElementById('service').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };

  const msgDiv = document.getElementById('message');

  try {
    const res = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      msgDiv.textContent = '✅ Appointment booked successfully!';
      msgDiv.className = 'message success';
      msgDiv.style.display = 'block';
      document.getElementById('bookingForm').reset();
      loadAppointments();
    } else {
      msgDiv.textContent = '❌ ' + (result.error || 'Failed to book appointment');
      msgDiv.className = 'message error';
      msgDiv.style.display = 'block';
    }
  } catch (err) {
    msgDiv.textContent = '❌ Server error. Please try again.';
    msgDiv.className = 'message error';
    msgDiv.style.display = 'block';
  }

  setTimeout(() => { msgDiv.style.display = 'none'; }, 4000);
});

// ========== Delete Appointment ==========
async function deleteAppointment(id) {
  if (!confirm('Are you sure you want to cancel this appointment?')) return;

  try {
    const res = await fetch(`${API_URL}/appointments/${id}`, { method: 'DELETE' });

    if (res.ok) {
      loadAppointments();
    } else {
      alert('Failed to cancel appointment.');
    }
  } catch (err) {
    alert('Server error. Please try again.');
  }
}

// ========== Set minimum date to today ==========
function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').setAttribute('min', today);
}

// ========== Initialize ==========
window.addEventListener('DOMContentLoaded', () => {
  loadServices();
  loadAppointments();
  setMinDate();
});
