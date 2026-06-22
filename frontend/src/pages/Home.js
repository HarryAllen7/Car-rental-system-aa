import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#2d3436", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      
      {/* Premium Hero Section */}
      <div className="hero" style={{ 
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600') no-repeat center center/cover",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
        padding: "0 20px"
      }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Rent a Car, Anytime, Anywhere
        </h1>
        <p style={{ fontSize: "1.2rem", fontWeight: "300", marginBottom: "30px", color: "#dfe6e9", maxWidth: "600px" }}>
          Affordable and reliable cars for your next trip. Experience premium travel at unmatched prices.
        </p>
        <Link to="/cars" className="btn btn-orange" style={{ 
          padding: "12px 32px", 
          fontSize: "1rem", 
          fontWeight: "600", 
          borderRadius: "6px", 
          textDecoration: "none", 
          boxShadow: "0 4px 15px rgba(230, 126, 34, 0.4)",
          transition: "transform 0.2s"
        }}>
          Browse Fleet
        </Link>
      </div>

      {/* Structured Value Proposition Section */}
      <div className="container" style={{ padding: "80px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 className="section-title" style={{ 
          fontSize: "2rem", 
          textAlign: "center", 
          marginBottom: "50px", 
          fontWeight: "600",
          position: "relative"
        }}>
          Why Choose Our Rental Fleet?
        </h2>
        
        {/* Modern Feature Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "25px" 
        }}>
          <div style={{ backgroundColor: "#fff", padding: "30px 25px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #f1f2f6" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>🚗</div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>Wide Range</h4>
            <p style={{ fontSize: "0.9rem", color: "#636e72", lineHeight: "1.5" }}>From budget hatchbacks to premium SUVs, choose the exact car that fits your specific journey.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "30px 25px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #f1f2f6" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>⚡</div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>Quick Booking</h4>
            <p style={{ fontSize: "0.9rem", color: "#636e72", lineHeight: "1.5" }}>Skip the tedious paperwork. Check active vehicle availability and reserve your car in under two minutes.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "30px 25px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #f1f2f6" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>💎</div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>Transparent Pricing</h4>
            <p style={{ fontSize: "0.9rem", color: "#636e72", lineHeight: "1.5" }}>What you see is what you pay. No hidden service charges, unexpected taxes, or platform processing fees.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "30px 25px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", border: "1px solid #f1f2f6" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>📊</div>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600" }}>All-in-One Dashboard</h4>
            <p style={{ fontSize: "0.9rem", color: "#636e72", lineHeight: "1.5" }}>Track your real-time approval status, view upcoming trip timelines, and review past history easily.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;