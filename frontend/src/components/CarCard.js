import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image || "https://via.placeholder.com/300x160?text=Car+Image"} alt={car.carName} />
      <div className="car-card-body">
        <h3>{car.carName}</h3>
        <p className="brand">{car.brand} • {car.model}</p>
        <p className="price">₹{car.pricePerDay} / day</p>
        <span className={`badge badge-${car.status}`}>{car.status}</span>
        <br /><br />
        <Link to={`/cars/${car._id}`} className="btn btn-small">View Details</Link>
      </div>
    </div>
  );
}

export default CarCard;