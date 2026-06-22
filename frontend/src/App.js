import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/myBookings";
import Profile from "./pages/Profile";
import Dashboard from "./pages/admin/Dashboard";
import ManageCars from "./pages/admin/ManageCars";
import ManageBookings from "./pages/admin/ManageBookings";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><Dashboard /></PrivateRoute>} />
          <Route path="/admin/cars" element={<PrivateRoute adminOnly={true}><ManageCars /></PrivateRoute>} />
          <Route path="/admin/bookings" element={<PrivateRoute adminOnly={true}><ManageBookings /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;