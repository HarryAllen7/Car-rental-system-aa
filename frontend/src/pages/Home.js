import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Rent a Car, Anytime, Anywhere</h1>
        <p>Affordable and reliable cars for your next trip</p>
        <br />
        <Link to="/cars" className="btn btn-orange">Browse Cars</Link>
      </div>
      <div className="container">
        <h2 className="section-title">Why choose us?</h2>
        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Wide range of cars to choose from</li>
          <li>Simple and quick booking process</li>
          <li>Transparent pricing, no hidden charges</li>
          <li>Manage all your bookings in one place</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;