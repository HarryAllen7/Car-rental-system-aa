import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">🚗 CarRental</Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cars">Browse Cars</Link></li>
          {user && user.role === "user" && (
            <>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/cars">Manage Cars</Link></li>
              <li><Link to="/admin/bookings">Manage Bookings</Link></li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
          {user && <li><button onClick={handleLogout}>Logout</button></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;