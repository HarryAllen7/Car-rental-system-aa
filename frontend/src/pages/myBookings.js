import { useState, useEffect } from 'react';
import api from '../services/api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get('/bookings/my');
    setBookings(res.data);
  };

  useEffect(() => { fetchBookings(); }, []);

  const cancelBooking = async (id) => {
    await api.put(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b) => (
        <div key={b._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '0.5rem' }}>
          <p>Car: {b.carId?.carName}</p>
          <p>From: {new Date(b.startDate).toLocaleDateString()} To: {new Date(b.endDate).toLocaleDateString()}</p>
          <p>Total: ₹{b.totalAmount}</p>
          <p>Status: {b.status}</p>
          {b.status !== 'cancelled' && <button onClick={() => cancelBooking(b._id)}>Cancel</button>}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;