import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
  carName: "",
  brand: "",
  model: "",
  pricePerDay: "",
  image: "",
  seats: 5,
  fuelType: "Petrol",
  location: "",
  status: "available",
};

function ManageCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (car) => {
    setFormData({
      carName: car.carName,
      brand: car.brand,
      model: car.model,
      pricePerDay: car.pricePerDay,
      image: car.image,
      seats: car.seats,
      fuelType: car.fuelType,
      location: car.location || "",
      status: car.status,
    });
    setEditingId(car._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingId) {
        await api.put(`/cars/${editingId}`, formData);
        setMessage("Car updated successfully");
      } else {
        await api.post("/cars", formData);
        setMessage("Car added successfully");
      }
      resetForm();
      fetchCars();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await api.delete(`/cars/${carId}`);
      setMessage("Car deleted successfully");
      fetchCars();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete car");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Manage Cars</h2>

      {message && <div className="success-text">{message}</div>}
      {error && <div className="error-text">{error}</div>}

      {!showForm && (
        <button className="btn btn-green" onClick={handleAddNew}>
          + Add New Car
        </button>
      )}

      {showForm && (
        <div className="form-box" style={{ maxWidth: "500px", margin: "20px 0" }}>
          <h2>{editingId ? "Edit Car" : "Add New Car"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Car Name</label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Model / Year</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price Per Day (₹)</label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Seats</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label>Hub Location</label>
              <select name="location" value={formData.location} onChange={handleChange} required>
                <option value="">Select Hub Location</option>
                <option value="Kochi Airport">Kochi Airport</option>
                <option value="Infopark">Infopark</option>
                <option value="Downtown Hub">Downtown Hub</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <button type="submit" className="btn btn-green">
              {editingId ? "Update Car" : "Add Car"}
            </button>{" "}
            <button type="button" className="btn btn-red" onClick={resetForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="loading-text">Loading cars...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Brand</th>
              <th>Price/Day</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.carName}</td>
                <td>{car.brand}</td>
                <td>₹{car.pricePerDay}</td>
                <td>{car.location || "N/A"}</td>
                <td><span className={`badge badge-${car.status}`}>{car.status}</span></td>
                <td className="action-icons">
                  <button className="btn btn-small" onClick={() => handleEdit(car)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-red btn-small"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageCars;