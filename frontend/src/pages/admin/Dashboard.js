import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="container">
      <h2 className="page-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats?.totalUsers ?? 0}</h2>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h2>{stats?.totalCars ?? 0}</h2>
          <p>Total Cars</p>
        </div>
        <div className="stat-card">
          <h2>{stats?.totalBookings ?? 0}</h2>
          <p>Total Bookings</p>
        </div>
        <div className="stat-card">
          <h2>{stats?.pendingBookings ?? 0}</h2>
          <p>Pending Bookings</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
