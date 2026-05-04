// src/components/Logout.jsx
import { useDispatch } from "react-redux";
import { logout } from "../app/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
