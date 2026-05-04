// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/api";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users"); // protected route
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Current User */}
      <div>
        <h3>Logged in User</h3>
        <p>Username: {user?.username}</p>
        <p>Location: {user?.location}</p>
      </div>

      <Logout />

      {/* Users List */}
      <div>
        <h3>All Users</h3>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {users.map((u) => (
          <div key={u._id}>
            <p>
              {u.username} - {u.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
