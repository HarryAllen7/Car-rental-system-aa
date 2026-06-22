import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seats, setSeats] = useState("");
  const [location, setLocation] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    try {
      let query = [];
      if (brand) query.push(`brand=${brand}`);
      if (maxPrice) query.push(`maxPrice=${maxPrice}`);
      if (fuelType) query.push(`fuelType=${fuelType}`);
      if (seats) query.push(`seats=${seats}`);
      if (location) query.push(`location=${location}`);
      
      const res = await api.get(`/cars${query.length ? "?" + query.join("&") : ""}`);
      setCars(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); // eslint-disable-line

  const handleReset = () => {
    setBrand("");
    setMaxPrice("");
    setFuelType("");
    setSeats("");
    setLocation("");
    setTimeout(fetchCars, 0);
  };

  return (
    <div className="container">
      <h2 className="page-title">Available Cars</h2>
      
      <form 
        className="filters" 
        onSubmit={(e) => { e.preventDefault(); fetchCars(); }}
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "15px", marginBottom: "20px" }}
      >
        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
          <label>Search by Brand</label>
          <input type="text" placeholder="e.g. Toyota" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        
        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
          <label>Max Price / day</label>
          <input type="number" placeholder="e.g. 3000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        
        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
          <label>Fuel Type</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="">All Fuels</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        
        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
          <label>Seats</label>
          <select value={seats} onChange={(e) => setSeats(e.target.value)}>
            <option value="">Any Seats</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="7">7 Seats</option>
          </select>
        </div>

        <div className="form-group" style={{ display: "flex", flexDirection: "column" }}>
          <label>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Kochi Airport">Kochi Airport</option>
            <option value="Infopark">Infopark</option>
            <option value="Downtown Hub">Downtown Hub</option>
          </select>
        </div>

        <button type="submit" className="btn" style={{ height: "38px" }}>Apply</button>
        <button type="button" className="btn btn-orange" onClick={handleReset} style={{ height: "38px" }}>Reset</button>
      </form>

      {loading ? <p className="loading-text">Loading cars...</p>
        : cars.length === 0 ? <p className="empty-msg">No cars found</p>
        : <div className="car-grid">{cars.map((car) => <CarCard key={car._id} car={car} />)}</div>
      }
    </div>
  );
}

export default Cars;