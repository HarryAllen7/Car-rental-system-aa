import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/bookings/${id}/approve`);
      setMessage("Booking approved");
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not approve booking");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.put(`/bookings/${id}/cancel`);
      setMessage("Booking cancelled");
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not cancel booking");
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="container">
      <h2 className="page-title">Manage Bookings</h2>

      {message && <div className="success-text">{message}</div>}

      {loading ? (
        <p className="loading-text">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="empty-msg">No bookings yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start</th>
              <th>End</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.userId ? `${b.userId.name} (${b.userId.email})` : "User removed"}</td>
                <td>{b.carId ? `${b.carId.carName}` : "Car removed"}</td>
                <td>{formatDate(b.startDate)}</td>
                <td>{formatDate(b.endDate)}</td>
                <td>₹{b.totalAmount}</td>
                <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                <td className="action-icons">
                  {b.status === "pending" && (
                    <button
                      className="btn btn-green btn-small"
                      onClick={() => handleApprove(b._id)}
                    >
                      Approve
                    </button>
                  )}
                  {(b.status === "pending" || b.status === "confirmed") && (
                    <button
                      className="btn btn-red btn-small"
                      onClick={() => handleCancel(b._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBookings;
