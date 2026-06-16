import { useState, useEffect } from 'react';
import api from '../services/api';

function Home() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchCars = async () => {
    const params = {};
    if (brand) params.brand = brand;
    if (maxPrice) params.maxPrice = maxPrice;
    const res = await api.get('/cars', { params });
    setCars(res.data);
  };

  useEffect(() => { fetchCars(); }, []);

  return (
    <div>
      <h1>Available Cars</h1>
      <input placeholder="Search by brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <input placeholder="Max price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <button onClick={fetchCars}>Filter</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {cars.map((car) => (
          <div key={car._id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{car.carName}</h3>
            <p>{car.brand} - {car.model}</p>
            <p>₹{car.pricePerDay} / day</p>
            <p>Status: {car.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;