import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    try {
      let query = [];
      if (brand) query.push(`brand=${brand}`);
      if (maxPrice) query.push(`maxPrice=${maxPrice}`);
      const res = await api.get(`/cars${query.length ? "?" + query.join("&") : ""}`);
      setCars(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []); // eslint-disable-line

  const handleReset = () => {
    setBrand("");
    setMaxPrice("");
    setTimeout(fetchCars, 0);
  };

  return (
    <div className="container">
      <h2 className="page-title">Available Cars</h2>
      <form className="filters" onSubmit={(e) => { e.preventDefault(); fetchCars(); }}>
        <div className="form-group">
          <label>Search by Brand</label>
          <input type="text" placeholder="e.g. Toyota" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Max Price / day</label>
          <input type="number" placeholder="e.g. 3000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        <button type="submit" className="btn">Apply</button>
        <button type="button" className="btn btn-orange" onClick={handleReset}>Reset</button>
      </form>
      {loading ? <p className="loading-text">Loading cars...</p>
        : cars.length === 0 ? <p className="empty-msg">No cars found</p>
        : <div className="car-grid">{cars.map((car) => <CarCard key={car._id} car={car} />)}</div>
      }
    </div>
  );
}

export default Cars;