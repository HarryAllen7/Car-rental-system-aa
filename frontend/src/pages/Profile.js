import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setFormData({ name: res.data.name, phone: res.data.phone || "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.put("/auth/profile", formData);

      // update the saved user info (keep token, update name)
      login({ ...user, name: res.data.name, phone: res.data.phone });

      setSuccess("Profile updated successfully");
      setFormData({ ...formData, password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box">
      <h2>My Profile</h2>

      {error && <div className="error-text">{error}</div>}
      {success && <div className="success-text">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email (cannot be changed)</label>
          <input type="email" value={user?.email || ""} disabled />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Add phone number"
          />
        </div>

        <div className="form-group">
          <label>New Password (leave blank to keep current)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
