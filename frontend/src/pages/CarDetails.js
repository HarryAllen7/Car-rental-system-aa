import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [booking, setBooking] = useState(false);

  const fetchCar = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  const getEstimatedTotal = () => {
    if (!startDate || !endDate || !car) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.pricePerDay : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError("End date must be after start date");
      return;
    }

    setBooking(true);
    try {
      await api.post("/bookings", { carId: id, startDate, endDate });
      setSuccess("Car booked successfully! Check 'My Bookings' for status.");
      fetchCar();
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed, try again");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <p className="loading-text">Loading car details...</p>;
  if (!car) return <p className="empty-msg">Car not found</p>;

  return (
    <div className="container">
      <div className="car-detail-box">
        <img
          src={car.image || "https://via.placeholder.com/320x220?text=Car+Image"}
          alt={car.carName}
        />

        <div className="car-detail-info">
          <h2>{car.carName}</h2>
          <p className="brand">{car.brand} • {car.model}</p>
          <p className="price">₹{car.pricePerDay} / day</p>
          <p>Seats: {car.seats} | Fuel: {car.fuelType}</p>
          <p className="location" style={{ fontSize: "0.95rem", color: "#2c3e50", marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
            📍 Pick-up Hub: <b>{car.location || "Main Hub"}</b>
          </p>
          <br />
          <span className={`badge badge-${car.status}`}>{car.status}</span>

          <hr style={{ margin: "16px 0" }} />

          {car.status === "available" ? (
            <>
              <h3>Book this car</h3>

              {error && <div className="error-text">{error}</div>}
              {success && <div className="success-text">{success}</div>}

              <form onSubmit={handleBooking}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                {getEstimatedTotal() > 0 && (
                  <p style={{ marginBottom: "10px" }}>
                    Estimated Total: <b>₹{getEstimatedTotal()}</b>
                  </p>
                )}

                <button type="submit" className="btn btn-green" disabled={booking}>
                  {booking ? "Booking..." : user ? "Confirm Booking" : "Login to Book"}
                </button>
              </form>
            </>
          ) : (
            <p style={{ color: "#e74c3c" }}>This car is currently not available for booking.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDetails;